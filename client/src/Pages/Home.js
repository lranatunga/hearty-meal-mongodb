import { useNavigate } from 'react-router-dom';
import RecipeTabs from "../Components/RecipeTabs";
import SearchBar from "../Components/SearchBar";
import Navbar from '../Components/NavBar';
import { useCookies } from "react-cookie";
import MainLayout from '../Layouts/MainLayout';

export default function Home () {

    return (
        <MainLayout>
        <div>
           

            <RecipeTabs/>

        </div>
        </MainLayout>
    )
}