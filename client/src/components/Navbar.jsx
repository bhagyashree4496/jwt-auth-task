import { useContext, useState } from "react";
import "../styles/other.css";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser, setToken } = useContext(AuthContext);
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };
  return (
    <nav className="navbar">
      {" "}
      <Link to="/">
        <span className="heading">Hello </span>
      </Link>
      <div className="dropdown">
        <button className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
          {user ? `Hello ${user.name}` : "Hi Sign In"}
        </button>
        {isOpen &&
          (user ? (
            <div className="dropdown-content">
              <Link to={"/profile"} onClick={() => setIsOpen(!isOpen)}>
                Profile
              </Link>
              <span
                onClick={() => {
                  handleLogout();
                  setIsOpen(!isOpen);
                }}
              >
                Logout
              </span>
            </div>
          ) : (
            <div className="dropdown-content">
              <Link to={"/login"} onClick={() => setIsOpen(!isOpen)}>
                {" "}
                Sign In
              </Link>
            </div>
          ))}
      </div>
    </nav>
  );
};

export default Navbar;
