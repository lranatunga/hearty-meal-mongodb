import { useNavigate } from "react-router-dom"
import ListByUser from "../Components/ListUserRecipe"
import MainLayout from "../Layouts/MainLayout"
import { useGetUserID } from "../CustomHooks/useGetUserID";

export default function UserPage () {
    const userID = useGetUserID();
    console.log("userID:",userID)
    const navigate = useNavigate()
    const handleCreateRecipe = () =>{
        navigate('/addnewrecipesbyuser')
    }
    return (
        <MainLayout>
        <div className="user-page">
        <button className="user-button" onClick={handleCreateRecipe}>Create new recipe</button>
        <div className="user-collection" style={{display:"flex", flexWrap:"wrap", backgroundColor:"#D4C79E", width:"80%"}}>
            <ListByUser userID={userID}/>
        </div>
        </div>
        </MainLayout>
    )
}