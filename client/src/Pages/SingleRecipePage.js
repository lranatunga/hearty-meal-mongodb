import ItemCard from "../Components/ItemCard";
// import MainLayout from "../Layouts/MainLayout";
import { Link, useParams } from "react-router-dom";
import Spinner from "../Components/Spinner";
import useFetchData from "../CustomHooks/useFetchData";
import MainLayout from "../Layouts/MainLayout";
// import '../Styles/page.css';

export default function SingleRecipePage() {
  const { id } = useParams();
  const { data } = useFetchData("http://localhost:5001/recipes/list");

  if (!data) {
    return <Spinner />;
  }

  const selectedRecipe = data.find((item) => item._id === id);
  console.log("selected recipe:", selectedRecipe)
  

  if (!selectedRecipe) {
    return <div>Recipe not found</div>;
  }

  const { image, ingredients, instructions, title } = selectedRecipe;

  return (
      <MainLayout>
      <div className="single-page">
        <ItemCard
          title={title}
          image={image}
          ingredients={ingredients}
          instructions={instructions}
        />
        <Link to="/">
          <button style={{
                        fontSize:'1.5rem', 
                        backgroundColor:'#D4C79E', 
                        marginLeft:'5rem', 
                        padding:'0.8rem',
                        borderRadius:'0.5rem'}}>Back to Home</button>
        </Link>
      </div>
      </MainLayout>
  )
}