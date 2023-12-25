// Home.js
import React from "react";
import { useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/authContext";

const Signup = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    contactNumber: "",
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
      const response = await axiosInstance.post("user/register", formData);
      console.log("Server Response:", response.data);
      login(response.data.token);
      localStorage.setItem("token", response.data.token)
      alert("Success")
      navigate('/');   
    } catch (error) {
      alert(error?.response?.data?.error? error.response.data.error : "Server Error" )
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <h2>Signup form</h2>
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
        <div className="row mb-3">
          <label for="email" className="col-sm-3 col-form-label">
            Email
          </label>
          <div className="col-sm-9">
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label for="name" className="col-sm-3 col-form-label">
            Name
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label for="contactNumber" className="col-sm-3 col-form-label">
            Contact Number
          </label>
          <div className="col-sm-9">
            <input
              type="number"
              className="form-control"
              placeholder="Enter phoneNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Sign up
        </button>
        <br />
        <a color="teal.500" href="/login">
          Already have an Account
        </a>
      </form>
    </div>
  );
};

export default Signup;
