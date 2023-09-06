const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const MONGO_URL = process.env.MONGO_URL

const connectToMongoDB = async () => {
  if (MONGO_URL && !mongoose.connection.readyState) {
    try {
      mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log(`Connected to ${MONGO_URL}`)
    } catch (error) {
      console.error('Error connecting to MongoDB:', error)
    }
  }
}

module.exports = connectToMongoDB
