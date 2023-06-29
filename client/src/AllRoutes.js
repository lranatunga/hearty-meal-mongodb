import { Route, Routes } from "react-router-dom";
import AddNewRecipes from './Pages/AddNewRecipePage';
import Home from './Pages/Home';
import SearchPage from './Pages/SearchPage';
import SingleRecipePage from './Pages/SingleRecipePage';
import LoginPage from "./Pages/LoginPage"
import UserRegister from './Pages/UserRegisterPage';
import UserPage from './Pages/UserPage'
import AddNewRecipesByUsers from './Pages/AddNewByUser';
import UserSingleRecipePage from "./Pages/UserSingleRecipe";
import EditRecipes from "./Pages/EditPage";

export default function AllRoutes () {
    return(
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path= '/register' element={<UserRegister/>}/>
        <Route path= '/login' element={<LoginPage/>}/>
        <Route path="/search" element={<SearchPage/>}/>
        <Route path="/singlerecipepage/:id" element={<SingleRecipePage/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/user" element={<UserPage/>}/>
        <Route path= '/addnewrecipes' element = {<AddNewRecipes/>} />
        <Route path= '/addnewrecipesbyuser' element = {<AddNewRecipesByUsers/>} />
        <Route path="/usersinglerecipepage/:id" element={<UserSingleRecipePage/>} />
        <Route path="/editrecipes" element={<EditRecipes/>}/>
      </Routes>
    )
}