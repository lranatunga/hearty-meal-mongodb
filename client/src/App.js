
import './App.css';

import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:5001/recipes/list");
      console.log("🚀 ~ data:", data);

      setUsers(data.data);

    };

    fetchData();
  }, []);

  return (
    <div className="App">
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
          {/* <p>{item.instructions}</p> */}
          <ul >
          {item.instructions.map((instruction, index) => (
            <li key={index} style={{ listStyle: 'none' }}>
              {instruction}
            </li>
          ))}
        </ul>
        </div>

      ))}
    </div>
  );
}

export default App;