import ItemCard from "../Components/ItemCard";
import { Link, useParams} from "react-router-dom";
import Spinner from "../Components/Spinner";
import useFetchData from "../CustomHooks/useFetchData";
import MainLayout from "../Layouts/MainLayout";
import '../Styles/Pages.css';

export default function UserSingleRecipePage() {
  const { id } = useParams();
  console.log(id)
//   const navigate = useNavigate();
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

  return (
      <MainLayout>
      <div className="single-page">
        <ItemCard
          title={title}
          image={image}
          ingredients={ingredients}
          instructions={instructions}
        />
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