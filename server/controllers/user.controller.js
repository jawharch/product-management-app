const jwt = require('jsonwebtoken');
const User = require('../models/user.model');



exports.register = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = new User(email, password)
    await user.hashPassword()
    const savedUser = await user.save()

    res.status(201).json({ message: 'User registered successfully', user: savedUser })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

  
    const user = await User.loginUser(email, password)

    
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    })

    res.status(200).json({ message: 'Login successful', token })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}


