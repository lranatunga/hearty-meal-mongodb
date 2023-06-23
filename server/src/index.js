import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnection from './config/db.js'
import recipesRoutes from './routes/recipesRoutes.js'

dotenv.config()
dbConnection()
const app = express ()
app.use(cors())
app.use(express.json())

app.use('/recipes', recipesRoutes)

app.listen(5001, () => console.log('Server is up and running at port 5001'))