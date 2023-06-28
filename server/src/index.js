import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnection from './config/db.js'
import recipesRoutes from './routes/recipesRoutes.js'
import userRoutes from "./routes/userRoutes.js"

dotenv.config()
dbConnection()
const app = express ()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded ({extended : false}))

app.use('/recipes', recipesRoutes)
app.use('/auth', userRoutes)
app.use("/uploads", express.static("./server/uploads"));

app.listen(5001, () => console.log('Server is up and running at port 5001'))