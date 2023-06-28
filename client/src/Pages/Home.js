import { useNavigate } from 'react-router-dom';
import RecipeTabs from "../Components/RecipeTabs";
import SearchBar from "../Components/SearchBar";

export default function Home () {
    const navigate = useNavigate()
    const handleClickSignup = () => {
        
        navigate('/register')
    }

    const handleClickSingIn = () => {
        
        navigate('/login')
    }
    return (
        <div>
            <button onClick={handleClickSignup}>Singup</button>
            <button onClick={handleClickSingIn}>SingIn</button>
            <SearchBar/>
            <RecipeTabs/>

        </div>
    )
}