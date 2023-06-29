import Recipe from "../model/Recipe.js"
import Recipebyuser from "../model/RecipesByUsers.js"

export const handleListRecipes = async (req, res) => {
    try{
        const recipes = await Recipe.find()
        .select("-__v")
        console.log("Recipe list:" , recipes)
        res.send(recipes)
    } catch (error) {
        console.log('Error list recipes:', error.message)
        res.send('Error in listing recipes' + error.message)
    }

}

export const handleListRecipesByUsers =  async (req, res) => {
  try {
    console.log("hello listByUser ");

    const owner = req.query.userOwner
    console.log("owner:", owner)
    ;

    if (!owner) return res.send({ success: false, error: "No user provided" });

    const recipebyuser = await Recipebyuser.find({ userOwner: owner })
      // .select("-__v")
      // .populate({ path: "owner", select: "username email image" }); // post owner

    res.send({ success: true, recipebyuser });
  } catch (error) {
    console.log("listByUser ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};


export const handleListOneRecipesByUsers = async (req, res) => {
  try {
    console.log("hello listOneby user ");

    const id = req.query.id;

    if (!id) return res.send({ success: false, error: "No tweet id provided" });

    const ListOneRecipesByUsers = await Recipebyuser.findById(id)
      .select("-__v")
      // .populate({ path: "owner", select: "username email image" }); // post owner

    res.send({ success: true, ListOneRecipesByUsers });
  } catch (error) {
    console.log("ListOneRecipesByUsers ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};






export const handleAddRecipeByUser = async (req, res) => {
  console.log("handleAddRecipeByUser:", req.body);

  try {
    let { title, category, ingredients, instructions, image, userOwner } = req.body;
    image  = req.file.filename;
    // userOwner = req.user.id;

    const addNewRecipe = await Recipebyuser.create({
      title,
      category,
      ingredients,
      instructions,
      image,
      userOwner
    });

    console.log("New Recipe added:", addNewRecipe);
    res.send('New recipe added to the DB');
  } catch (error) {
    console.log("Error adding recipe:", error.message);
    res.send('Error in adding recipe: ' + error.message);
  }
};


export const handleAddRecipe = async (req, res) => {
  console.log("handleAddRecipe:", req.body);

  try {
    let { title, category, ingredients, instructions, image } = req.body;
    image  = req.file.filename;

    const addNewRecipe = await Recipe.create({
      title,
      category,
      ingredients,
      instructions,
      image,
    });

    console.log("New Recipe added:", addNewRecipe);
    res.send('New recipe added to the DB');
  } catch (error) {
    console.log("Error adding recipe:", error.message);
    res.send('Error in adding recipe: ' + error.message);
  }
};

 



export const handleEditRecipe = async (req, res) => {
  const { id } = req.query;
    try {
      const { title, category, ingredients, instructions } = req.body;
      console.log("edit id:", id)
      let image = req.body.image;
  
      
      if (req.file) {
        image = req.file.filename; 
      }
  
      const updatedRecipe = await Recipebyuser.findByIdAndUpdate(
        id,
        {
          title,
          category,
          ingredients,
          instructions,
          image,
        },
        { new: true }
      );
  
      console.log("Updated Recipe:", updatedRecipe);
      res.send("Recipe updated in the DB");
    } catch (error) {
      console.log("Error updating recipe:", error.message);
      res.send("Error in updating recipe: " + error.message);
    }
  };
  


export const handeleDeleteRecipe = async (req, res) => {
    console.log("Delete recipe:", req.params)

    try{
        const deleteRecipe = await Recipebyuser.findByIdAndDelete(req.params.id)
        console.log('Delete recipe:', deleteRecipe)
        res.send("Recipe deleted from the DB")
    } catch (error) {
        console.log('Error deleting recipe:', error.message)
        res.send('Error in deleting recipe:', error.message)
    }

}



export const handleSearchRecipes = async (req, res) => {
    try {
      const text = req.query.text;
      console.log("Search text:", text);
      if (!text) {
        return res.send({ success: false, error: "No search text provided" });
      }
      const regExp = new RegExp(text, "i");
  
      const searchRecipes = await Recipe.find({
        $or: [
          { title: regExp },
          { ingredients: regExp },
          { instructions: regExp }
        ]
      })
        .select("-__v");
  
      res.send({ success: true, searchRecipes });
      console.log(searchRecipes)
    } catch (error) {
      console.log("Search error:", error.message);
      res.send({ success: false, error: error.message });
    }
  };
  
