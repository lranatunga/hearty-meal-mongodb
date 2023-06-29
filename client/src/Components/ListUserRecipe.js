// import useFetchData from "../CustomHooks/useFetchData";
// import ItemCard from "./ItemCard";
// import Spinner from "../Components/Spinner";
// import { useNavigate } from "react-router-dom";
// import { useGetUserID } from "../CustomHooks/useGetUserID";
// // import "./category.css";


// export default function ListByUser() {
//     const userID = useGetUserID();
//     const { data } = useFetchData(`http://localhost:5001/recipes/listrecipesbyowner?userOwner=${userID}` );
//     console.log("datafetched",data)
   
  
//     if (!data) {
//       return <Spinner />;
//     }
   
//     const dataByUser = data.recipebyuser;
//     console.log("databyuer:",dataByUser)
//     return (
//       <div className="category-group">
//         {dataByUser.map((item) => {
//           const { _id, image, title, ingredients, instructions } = item;
//           return (
//             <ItemCard
//             key={_id}
//             title={title}
//             image={image}
//             ingredients={ingredients}
//             instructions={instructions}
//           />
//           );
//         })}
//       </div>
//     );
//   }

import useFetchData from "../CustomHooks/useFetchData";
import ItemCard from "./ItemCard";
import Spinner from "../Components/Spinner";
import { useNavigate } from "react-router-dom";
import SummaryCard from "./SummaryCard";

export default function ListByUser({ userID }) {
  const navigate = useNavigate();
  const { data } = useFetchData(
    `http://localhost:5001/recipes/listrecipesbyowner?userOwner=${userID}`
  );

  if (!userID || !data) {
    // Render a loading spinner or a message indicating the data is being fetched
    return <Spinner />;
  }
  
  
  const handleReadMore = (_id) => {
      console.log("_id", _id)
    navigate(`/usersinglerecipepage/${_id}`);
  };

  const dataByUser = data.recipebyuser;

  return (
    <div className="category-group" style={{margin:"2rem"}}>
      {dataByUser.map((item) => {
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
