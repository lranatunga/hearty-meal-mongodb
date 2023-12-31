import express from 'express'
import {handleListRecipes,
        handleAddRecipe,
        handleEditRecipe,
        handeleDeleteRecipe,
        handleAddRecipeByUser,
        handleListRecipesByUsers,
        handleListOneRecipesByUsers,
        handleSearchRecipes} from '../controllers/recipeController.js'
import multer from "multer";

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "./server/uploads");
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      
          let extension = "";
      
          // get the rest of string after 5th character
          if (file.mimetype.includes("image"))
            extension = "." + file.mimetype.slice(6);
          console.log("extension:", extension);
      
          console.log("INSIDE STORAGE OBJECT: file=", file);
      
          cb(null, file.fieldname + "-" + uniqueSuffix + extension);
        },
      });

const upload = multer({ storage: storage });

const router = express.Router()

router.get('/list', handleListRecipes)
router.get('/listrecipesbyowner', handleListRecipesByUsers)
router.get('/listonerecipesbyowner', handleListOneRecipesByUsers)
router.get('/search', handleSearchRecipes)
router.post('/add', upload.single('image'), handleAddRecipe)
router.post('/addbyuser', upload.single('image'), handleAddRecipeByUser)
router.put('/edit', upload.single('image'),handleEditRecipe)
router.delete('/delete/:id', handeleDeleteRecipe)

export default router