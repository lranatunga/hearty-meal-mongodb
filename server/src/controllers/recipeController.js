import Recipe from "../model/Recipe.js"

export const handleListRecipes = async (req, res) => {
    try{
        const recipes = await Recipe.find()
        console.log("Recipe list:" , recipes)
        res.send(recipes)
    } catch (error) {
        console.log('Error list recipes:', error.message)
        res.send('Error in listing recipes' + error.message)
    }
}

export const handleAddRecipe = async (req, res) => {
    console.log('handleAddRecipe:', req.body)

    try{
        const addNewRecipe = await Recipe.create(req.body)
        console.log("New Recipe add:", addNewRecipe)
        res.send('New recipe add to the DB')
    } catch (error) {
        console.log('Error add recipes:', error.message)
        res.send('Error in adding recipes' + error.message)
    }
}

export const handleEditRecipe = async (req, res) => {
    console.log("handleEditRecipe:", req.body);
  
    try {
      const editedRecipe = await Recipe.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
      });
      console.log("edited recipe:", editedRecipe);
  
      res.send("Recipe edited");
    } catch (error) {
      console.log("Error editting recipe :", error.message);
  
      res.send("Error in editting recipe" + error.message);
    }
  };


export const handeleDeleteRecipe = async (req, res) => {
    console.log("Delete recipe:", req.params)

    try{
        const deleteRecipe = await Recipe.findByIdAndDelete(req.params.id)
        console.log('Delete recipe:', deleteRecipe)
        res.send("Recipe deleted from the DB")
    } catch (error) {
        console.log('Error deleting recipe:', error.message)
        res.send('Error in deleting recipe:', error.message)
    }

}