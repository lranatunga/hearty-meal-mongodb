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