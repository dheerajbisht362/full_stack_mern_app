import React from "react";
import { useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { useAuth } from "../context/authContext";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("user/login", formData);
      console.log("Server Response:", response.data);
      login(response.data.token);
      localStorage.setItem("token", response.data.token)
      const decodedToken = jwtDecode(response.data.token);
      decodedToken.role == "admin" ? navigate("/bookInventory") : navigate('/');  
      alert("Success")
    } catch (error) {
      alert(error?.response?.data?.error?error.response.data.error : "Server Error" )
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <h2>Login form</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label for="username" className="col-sm-3 col-form-label">
            Username
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              placeholder="Enter username"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label for="inputPassword3" className="col-sm-3 col-form-label">
            Password
          </label>
          <div className="col-sm-9">
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Sign in
        </button><br/>
        <a color="teal.500" href="/signup">
          Create a new Account
        </a>
      </form>
    </div>
  );
};

export default Login;
