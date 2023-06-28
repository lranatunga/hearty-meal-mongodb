import { Routes, Route, Link } from "react-router-dom";
import '../Styles/component.css';
import { useState } from "react";
import UserPage from "../Pages/UserPage";
import { auth, provider } from "../firebase-config";

import { useNavigate } from "react-router-dom";
import AddNewRecipePage from "../Pages/AddNewRecipePage";

export default function Login () {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
    const signUserOut = () => {
        signOut(auth).then(() => {
          localStorage.clear();
          setIsAuth(false);
          window.location.pathname = "/home";
        });
      };

    return(
        <>
            
            {!isAuth ? (
            <button className="login-button" onClick={signInWithGoogle}>Login</button>
//<Link to="/login" id="login-button"> Login </Link>
            ) : (
            <>
                <Link to="/addnewrecipes"><button className="user-button">Add new recipe</button></Link>
                <Link to="/user"><button className="user-button">My kitchen</button></Link>
                <button onClick={signUserOut} className="login-button"> Log Out</button>
            </>
            )}
            <Routes>
                
                <Route path="/user" element={<UserPage isAuth={isAuth} />} />
                <Route path="/addnewrecipes" element={<AddNewRecipePage isAuth={isAuth} />} />
                <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
            </Routes>
        </>
    )
}