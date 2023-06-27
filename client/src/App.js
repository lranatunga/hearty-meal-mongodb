
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchContextFunction from './Context/SearchContext';
import { useEffect, useState } from "react";
import axios from "axios";
import AddNewRecipes from './Pages/AddNewRecipePage';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:5001/recipes/list");
      
      console.log("data:", data);

      setUsers(data.data);

    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
    <div className="App">
    <SearchContextFunction>
      <AddNewRecipes/>
      {users.map((item, idx) => (
        <div key={idx} >
          <p>{item.title}</p>
          <ul>
          {item.ingredients.map((ingredient, index) => (
            <li key={index} style={{ listStyle: 'none' }}>
              {ingredient}
            </li>
          ))}
        </ul>
          <p>{item.instructions}</p>
          {/* <ul >
          {item.instructions.map((instruction, index) => (
            <li key={index} style={{ listStyle: 'none' }}>
              {instruction}
            </li>
          ))}
        </ul> */}
        <div><img src={`http://localhost:5001/uploads/${item.image}`} alt={item.title} /></div>
        </div>

      ))}
    </SearchContextFunction>
    </div>
    </BrowserRouter>
  );
}

export default App;