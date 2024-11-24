require('dotenv').config()
const { MongoClient } = require('mongodb')

const uri = process.env.MONGO_URI

let db = null

async function connectDB() {
    if (db) return db

    try {
        const client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB')
        db = client.db('test')
        return db
    } catch (err) {
        console.error('Error connecting to MongoDB:', err)
        throw err
    }
}

module.exports = { connectDB }