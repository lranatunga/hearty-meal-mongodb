
import MainLayout from "../Layouts/MainLayout";
import { useState, useEffect } from "react";
import noimage from "../images/noimage.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserID } from "../CustomHooks/useGetUserID";
import { useCookies } from "react-cookie";
import useFetchData from "../CustomHooks/useFetchData";
import "../Styles/Pages.css";

export default function EditRecipes() {
  const userID = useGetUserID();
  const { id } = useParams();
  console.log("edit recipe id:", id);
  const { data } = useFetchData(`http://localhost:5001/recipes/listonerecipesbyowner?id=${id}`);
  console.log("edit fetch data:", data);

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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  
  
  const imagePath = `http://localhost:5001/uploads/${image}`;
  console.log("image path:", imagePath)

  useEffect(() => {
    if (data && data.ListOneRecipesByUsers) {
      const { title, ingredients, instructions, category, image } = data.ListOneRecipesByUsers;
      setTitle(title);
      setIngredients(ingredients);
      setInstructions(instructions);
      setCategory(category);
      setImage({ url: "", file: null });
   
      if (image) {
        setImage((prevImage) => ({
          ...prevImage,
          url: `http://localhost:5001/uploads/${image}`,
        }));
      }
    }
  }, [data]);

 

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
    formData.append("userOwner", userID);
  
    try {
      const response = await axios.put(`/recipes/edit?id=${id}`, formData, {
        headers: {
            "Content-type": "multipart/form-data; charset=UTF-8",  authorization: cookies.access_token,
        },
      });
  
      setFormSubmitted(true);
      console.log("Response:", response);
    //   navigate("/user");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleDeleteIngredient = (index) => {
    setIngredients((prevIngredients) => {
      const updatedIngredients = [...prevIngredients];
      updatedIngredients.splice(index, 1);
      return updatedIngredients;
    });
  };
  

  return (
    <MainLayout>
      <div>
        <div>
          <div className="AddNewRecipe">
            {!formSubmitted ? (
              <form onSubmit={handleSubmit}>
                <label style={{display:"flex", gap:"2rem", marginTop:"1rem",fontSize:"1.2rem" }}>
                  Recipe Title:
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{height:"3rem", width:"40rem"}}
                  />
                </label>
                <label style={{display:"flex", gap:"2rem", marginTop:"2rem",fontSize:"1.2rem"}}>
                  Ingredients:
                  <input
                    type="text"
                    id="ingredient"
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    style={{height:"3rem", width:"40rem"}}
                  />
                  <button type="button" onClick={handleAddIngredient} style={{backgroundColor:"#D6570F", color:"white", }}>
                    Add Ingredient
                  </button>
                </label>
                <ul style={{display:"flex", flexDirection:"column", alignSelf:"center", gap:"2rem", marginTop:"1rem",fontSize:"1.2rem"}}>
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="dot-list">
                      {ingredient}
                      <button onClick={() => handleDeleteIngredient(index)} style={{backgroundColor:"#D6570F", color:"white", }}>Delete</button>
                    </li>
                  ))}
                </ul >
                <label style={{display:"flex", gap:"2rem", marginTop:"2rem",fontSize:"1.2rem"}}>
                  Instructions:
                  <textarea
                    type="text"
                    id="instructions"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    style={{width:"40rem", height:"40rem"}}
                  />
                </label>
                <label style={{display:"flex", gap:"2rem", marginTop:"2rem",fontSize:"1.2rem"}}>
                  Category:
                  <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select a category</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Main Recipes">Main Recipes</option>
                    <option value="Quick Recipes">Quick Recipes</option>
                    <option value="Special Recipes">Special Recipes</option>
                  </select>
                </label>
                <div>
                  <img style={{marginTop:"2rem", width:"30rem", height:"30rem"}}className="w-[300px] h-[300px] object-cover" src={image.url || noimage} alt="" />
                  <label style={{ display: "flex", gap: "3rem" }}>
                    Add an image:
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      name="image"
                      onChange={handleImageChange}
                      style={{marginTop:"2rem", width:"20rem", height:"8rem"}}
                    />
                  </label>
                </div>
                <button type="submit" style={{marginTop:"2rem",fontSize:"1.5rem", width:"8rem", backgroundColor:"#38AA5E"}}>Submit</button>
              </form>
            ) : (
              <div
                style={{
                  color: "green",
                  fontSize: "3rem",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30%",
                  alignContent: "center",
                }}
              >
                Recipe Updated Successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
