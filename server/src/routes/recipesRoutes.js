import express from 'express'
import {handleListRecipes,
        handleAddRecipe,
        handleEditRecipe,
        handeleDeleteRecipe,
        handleSearchRecipes} from '../controllers/recipeController.js'
import multer from "multer";

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "./server/uploads");
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname)
      
        },
      });

const upload = multer({ storage: storage });

const router = express.Router()

router.get('/list', handleListRecipes)
router.get('/search', handleSearchRecipes)
router.post('/add', upload.single('recipeImage'), handleAddRecipe)
router.put('/edit', upload.single('recipeImage'),handleEditRecipe)
router.delete('/delete/:id', handeleDeleteRecipe)

export default router