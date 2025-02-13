import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { GetUserApi } from "../api/api";

const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const fetchUser = async () => {
    try {
      const response = await GetUserApi();
      console.log("Fetched User:", response);
      setUser({ token, ...response });
    } catch (e) {
      alert(`Error fetching user: ${e.message}`);
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  console.log(user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
