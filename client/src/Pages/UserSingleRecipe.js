import ItemCard from "../Components/ItemCard";
import { Link, useParams, useNavigate} from "react-router-dom";
import Spinner from "../Components/Spinner";
import useFetchData from "../CustomHooks/useFetchData";
import MainLayout from "../Layouts/MainLayout";
import { useState } from "react";
import axios from "axios";
import '../Styles/Pages.css';

export default function UserSingleRecipePage() {
  const { id } = useParams();
  console.log(id)
  const navigate = useNavigate();
  const { data } = useFetchData(`http://localhost:5001/recipes/listonerecipesbyowner?id=${id}`);
  console.log("user single data:", data)

  if (!data) {
    return <Spinner />;
  }

  const selectedRecipe = data.ListOneRecipesByUsers

  

  if (!selectedRecipe) {
    return <div>Recipe not found</div>;
  }

  const { image, ingredients, instructions, title } = selectedRecipe;

  const handleDeleteRecipes = async() => {
    try {
        await axios.delete(`http://localhost:5001/recipes/delete/${id}`);
        navigate("/user");
      } catch (error) {
        console.error("Error deleting recipe:", error.message);
      }
   
  }

  const handeleEditeRecipe = async () => {
    try {
        await axios.delete(`http://localhost:5001/recipes/delete/${id}`);
        navigate ('/editrecipes')
      } catch (error) {
        console.error("Error deleting recipe:", error.message);
      }
    

  }

  return (
      <MainLayout>
      <div className="single-page">
        <div>
        <ItemCard
          title={title}
          image={image}
          ingredients={ingredients}
          instructions={instructions}
        />
        <button className="user-button" onClick={handleDeleteRecipes}>Delete Recipe</button>
        <button className="login-button" onClick={handeleEditeRecipe}>Edit Recipe</button>
        </div>
        <Link to="/user">
          <button style={{
                        fontSize:'1.5rem', 
                        backgroundColor:'#D4C79E', 
                        marginLeft:'5rem', 
                        padding:'0.8rem',
                        borderRadius:'0.5rem'}}>Back to Profile</button>
        </Link>
      </div>
      </MainLayout>
  )
}