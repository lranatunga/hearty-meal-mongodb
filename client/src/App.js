
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchContextFunction from './Context/SearchContext';
import { useEffect, useState } from "react";
import axios from "axios";
import AddNewRecipes from './Pages/AddNewRecipePage';
import RecipeTabs from './Components/RecipeTabs';
import Home from './Pages/Home';
import SearchPage from './Pages/SearchPage';
import SingleRecipePage from './Pages/SingleRecipePage';
import LoginPage from "./Pages/Login"

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:5001/recipes/list");
      
      // console.log("data:", data);

      setUsers(data.data);

    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
    <div className="App">
    <SearchContextFunction>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/search" element={<SearchPage/>}/>
      <Route path="/singlerecipepage/:id" element={<SingleRecipePage/>} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path= '/addnewrecipes' element = {<AddNewRecipes/>} />
      
    </Routes>
    {/* <Appetizer/>
    <Dessert/>
    <MainRecipes/>
    <QuickRecipes/>
    <SpecialRecipes/>
    <SingleRecipePage/> */}
    {/* <RecipeTabs/>
      <AddNewRecipes/> */}
     
    </SearchContextFunction>
    </div>
    </BrowserRouter>
  );
}

export default App;