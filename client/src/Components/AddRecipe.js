// AddNewRecipes.js

import { useState } from "react";
import noimage from "../images/noimage.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../CustomHooks/useGetUserID";
import { useCookies } from "react-cookie";


const AddNewRecipesByUser = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState({
    url: noimage,
    file: null,
  });
  // const [userOwner, setUserOwner] = useState(userID)
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (!e.currentTarget.files[0]) return;

    if (e.currentTarget.files[0].size > 1000000) {
      alert("This file is bigger than 10kB");
      return;
    }
    setImage({
      url: URL.createObjectURL(e.currentTarget.files[0]),
      file: e.currentTarget.files[0],
    });
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, newIngredient]);
    setNewIngredient("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}]`, ingredient);
    });
    formData.append("instructions", instructions);
    formData.append("image", image.file);
    formData.append("userOwner", userID );

    try {
      const response = await axios.post("/recipes/addbyuser", formData, {
        headers: {
          "Content-type": "multipart/form-data; charset=UTF-8;  authorization: cookies.access_token",
        },
      });

      setFormSubmitted(true);
      console.log("Response:", response);
      navigate("/user");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <div className="AddNewRecipe">
        {!formSubmitted ? (
          <form onSubmit={handleSubmit}>
            <label>Add your recipe title:</label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Add your Ingredients:</label>
            <div>
              <input
                type="text"
                id="ingredient"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                placeholder="Enter an ingredient"
              />
              <button type="button" onClick={handleAddIngredient}>
                Add Ingredient
              </button>
            </div>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <label>Add your Instructions:</label>
            <textarea
              type="text"
              id="instructions"
              placeholder="Instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
            <label>Category: </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Desserts">Desserts</option>
              <option value="Main Recipes">Main Recipes</option>
              <option value="Quick Recipes">Quick Recipes</option>
              <option value="Special Recipes">Special Recipes</option>
            </select>
            <div>
              <label>Add an image:</label>
              <input
                type="file"
                accept="image/png, image/jpeg"
                name="image"
                onChange={handleImageChange}
              />
              <img
                className="w-[300px] h-[300px] object-cover"
                src={image.url || noimage}
                alt=""
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        ) : (
          <div
            style={{
              color: "green",
              fontSize: "3rem",
              display: "flex",
              justifyContent: "center",
              marginTop: "48%",
              alignContent: "center",
            }}
          >
            Recipe submitted successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNewRecipesByUser;
