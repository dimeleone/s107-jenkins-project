import mongoose from 'mongoose'

export default class MongoDbConnection {
  static async connect(paramUrl?: string) {
    const url = process.env.MONGODB_URI ?? paramUrl

    if (!url) {
      throw new Error('MONGODB_URI must be defined')
    }

    await mongoose.connect(url)

    console.log("Connected to MongoDB")
  }
}
