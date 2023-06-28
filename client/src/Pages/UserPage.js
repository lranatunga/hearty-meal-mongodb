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
        <div>
        <button onClick={handleCreateRecipe}>Create new recipe</button>
        <ListByUser userID={userID}/>
        </div>
        </MainLayout>
    )
}