import useFetchData from "../CustomHooks/useFetchData";
import SummaryCard from "../Components/SummaryCard";
import Spinner from "../Components/Spinner";
// import { useNavigate } from "react-router-dom";
import "./category.css";


export default function QuickRecipes() {
    const { data } = useFetchData("http://localhost:5001/recipes/list" );
    console.log("datafetched",data)
    // const navigate = useNavigate();
  
    const handleReadMore = (id) => {
    //   navigate(`/singlerecipepage/${id}`);
    };
  
    if (!data) {
      return <Spinner />;
    }
    
    const quickRecipeCard = data.filter(
      (item) => item.category.toLowerCase() === "quick recipes"
    );
  
    return (
      <div className="category-group">
        {quickRecipeCard.map((item) => {
          const { id, image, title } = item;
          return (
            <SummaryCard
              key={id}
              title={title}
              image={image}
              onHandleClick={() => handleReadMore(id)}
            />
          );
        })}
      </div>
    );
  }