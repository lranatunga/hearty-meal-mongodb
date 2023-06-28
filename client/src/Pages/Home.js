import { useNavigate } from 'react-router-dom';
import RecipeTabs from "../Components/RecipeTabs";
import SearchBar from "../Components/SearchBar";
import Navbar from '../Components/NavBar';
import { useCookies } from "react-cookie";

export default function Home () {

    return (
        <div>
            <Navbar/>

            <RecipeTabs/>

        </div>
    )
}