import express from 'express'
import {handleListRecipes,
        handleAddRecipe,
        handleEditRecipe,
        handeleDeleteRecipe,
        handleSearchRecipes} from '../controllers/recipeController.js'

const router = express.Router()

router.get('/list', handleListRecipes)
router.get('/search', handleSearchRecipes)
router.post('/add', handleAddRecipe)
router.put('/edit', handleEditRecipe)
router.delete('/delete/:id', handeleDeleteRecipe)

export default router