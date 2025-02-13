import { useContext, useState } from "react";
import "../styles/auth.css";
import { LogInApi } from "../api/api";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setUser, setToken } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Signup Data:", formData);
    try {
      const res = await LogInApi(formData);
      localStorage.setItem("token", res.token);
      setUser(res);
      setToken(res.token);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Log In</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="signup-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="signup-input"
            required
          />
          <button type="submit" className="signup-button">
            Log In
          </button>
        </form>
        <p className="signup-link">
          New here? <Link to="/signup">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
