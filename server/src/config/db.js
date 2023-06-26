import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

export default async function dbConnection () {
    try{
        await mongoose.connect(process.env.DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
        console.log('Connected to DB')
    } catch (error) {
        console.log('Error Connecting to DB:', error.message)
    }
}