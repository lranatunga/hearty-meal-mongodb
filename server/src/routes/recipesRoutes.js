import express from 'express'
import {handleListRecipes,
        handleAddRecipe} from '../controllers/recipeController.js'

const router = express.Router()

router.get('/list', handleListRecipes)
router.post('/add', handleAddRecipe)

export default router