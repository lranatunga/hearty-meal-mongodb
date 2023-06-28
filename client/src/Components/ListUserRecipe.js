import useFetchData from "../CustomHooks/useFetchData";
import ItemCard from "./ItemCard";
import Spinner from "../Components/Spinner";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../CustomHooks/useGetUserID";
// import "./category.css";


export default function ListByUser() {
    const userID = useGetUserID();
    const { data } = useFetchData(`http://localhost:5001/recipes/listrecipesbyowner?userOwner=${userID}` );
    console.log("datafetched",data)
   
  
    if (!data) {
      return <Spinner />;
    }
   
    const dataByUser = data.recipebyuser;
    console.log("databyuer:",dataByUser)
    return (
      <div className="category-group">
        {dataByUser.map((item) => {
          const { _id, image, title, ingredients, instructions } = item;
          return (
            <ItemCard
            key={_id}
            title={title}
            image={image}
            ingredients={ingredients}
            instructions={instructions}
          />
          );
        })}
      </div>
    );
  }