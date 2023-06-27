import ItemCard from "../Components/ItemCard";
// import MainLayout from "../Layouts/MainLayout";
import { Link, useParams } from "react-router-dom";
import Spinner from "../Components/Spinner";
import useFetchData from "../CustomHooks/useFetchData";
// import '../Styles/page.css';

export default function SingleRecipePage() {
  const { _id } = useParams();
  const { data } = useFetchData("http://localhost:5001/recipes/list");

  if (!data) {
    return <Spinner />;
  }

  const selectedRecipe = data.find((item) => item.id === _id);

  if (!selectedRecipe) {
    return <div>Recipe not found</div>;
  }

  const { image, ingredients, instructions, title } = selectedRecipe;

  return (
    
      <div className="single-page">
        <ItemCard
          title={title}
          image={image}
          ingredients={ingredients}
          instructions={instructions}
        />
        <Link to="/recipe">
          <button style={{
                        fontSize:'1.5rem', 
                        backgroundColor:'#D4C79E', 
                        marginLeft:'5rem', 
                        padding:'0.8rem',
                        borderRadius:'0.5rem'}}>Back to Recipes</button>
        </Link>
      </div>
  )
}