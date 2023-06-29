import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import SearchBar from "./SearchBar";
import "../Styles/component.css"

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleClickSignup = () => {
    navigate('/register');
  };

  const handleClickSingIn = () => {
    navigate('/login');
  };

  const handleClickHome = () => {
    navigate('/');
  }

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/");
  };

  const profile = () => {
    navigate("/user");
  };

  return (
    <div className="navbar">
      <button className="login-button" onClick={handleClickHome}>Home</button>
      <SearchBar/>
      {!cookies.access_token ? (
        <div>
          <button className="user-button" onClick={handleClickSignup}>Sign up</button>
          <button  className="login-button" onClick={handleClickSingIn}>Sign In</button>
        </div>
      ) : (
        <div>
        <button className="user-button" onClick={logout}>Logout</button>
        <button className="login-button" onClick={profile}>Profile</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
