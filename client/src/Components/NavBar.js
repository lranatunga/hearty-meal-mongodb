import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import SearchBar from "./SearchBar";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleClickSignup = () => {
    navigate('/register');
  };

  const handleClickSingIn = () => {
    navigate('/login');
  };

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
      <Link to="/">Home</Link>
      <SearchBar/>
      {!cookies.access_token ? (
        <div>
          <button onClick={handleClickSignup}>Signup</button>
          <button onClick={handleClickSingIn}>Sign In</button>
        </div>
      ) : (
        <div>
        <button onClick={logout}>Logout</button>
        <button onClick={profile}>Profile</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
