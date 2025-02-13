import { createContext, useState, useEffect } from "react";
import { GetUserApi } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
