
import './App.css';
import { BrowserRouter} from "react-router-dom";
import SearchContextFunction from './Context/SearchContext';
import AllRoutes from './AllRoutes';


function App() {


  return (
    <BrowserRouter>
    
      <SearchContextFunction>
        <div className="App">
          <AllRoutes/>
        </div>
      </SearchContextFunction>
    
    </BrowserRouter>
  );
}

export default App;