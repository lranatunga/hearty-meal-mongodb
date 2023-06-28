import { useNavigate } from "react-router-dom"
import ListByUser from "../Components/ListUserRecipe"

export default function UserPage () {
    const navigate = useNavigate()
    const handleCreateRecipe = () =>{
        navigate('/addnewrecipesbyuser')
    }
    return (
        <div>
        <button onClick={handleCreateRecipe}>Create new recipe</button>
        <ListByUser/>
        </div>
    )
}