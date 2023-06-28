import useFetchData from "../CustomHooks/useFetchData";
import SummaryCard from "../Components/SummaryCard";
import Spinner from "../Components/Spinner";
import { useNavigate } from "react-router-dom";
import "./category.css";


export default function SpecialRecipes() {
    const { data } = useFetchData("http://localhost:5001/recipes/list" );
    // console.log("datafetched",data)
    const navigate = useNavigate();
  
    const handleReadMore = (_id) => {
        console.log("_id", _id)
      navigate(`/singlerecipepage/${_id}`);
    };
  
    if (!data) {
      return <Spinner />;
    }
    
    const specialRecipeCard = data.filter(
      (item) => item.category.toLowerCase() === "special recipes"
    );
  
    return (
      <div className="category-group">
        {specialRecipeCard.map((item) => {
          const { _id, image, title } = item;
          return (
            <SummaryCard
              key={_id}
              title={title}
              image={image}
              onHandleClick={() => handleReadMore(_id)}
            />
          );
        })}
      </div>
    );
  }