const { connectDB } = require('../db')
const bcrypt = require('bcryptjs')

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password
  }

 
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }


  async save() {
    const db = await connectDB()

  
    const existingUser = await db.collection('users').findOne({ email: this.email })
    if (existingUser) {
      throw new Error('User already exists')
    }

   
    const result = await db.collection('users').insertOne({
      email: this.email,
      password: this.password,
    });

    return { id: result.insertedId, email: this.email }
  }

  static async loginUser(email, password) {
    const db = await connectDB()

    
    const user = await db.collection('users').findOne({ email })
    if (!user) {
      throw new Error('Invalid email or password')
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new Error('Invalid email or password')
    }

    return { id: user._id, email: user.email }
  }
}

module.exports = User