import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import axiosInstance from "../config/axiosInstance";
import axiosConfig from "../config/axiosToken";

const AddBook = () => {
  const { authData } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    currentAvailabilityStatus:"true"
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
    console.log(formData)
    e.preventDefault();

    try {
      const response = await axiosInstance.post("book/add", formData, axiosConfig);
      alert(response.data.message)
    }catch (error) {
      alert(error?.response?.data?.error?error.response.data.error : "Server Error" )
    } finally {
      setLoading(false);
    }
  };
  
  if (authData.userRole != "admin") {
    return <p>Unauthorised</p>;
  }
  const { logout } = useAuth();
  function handleSignout(){
      logout()
      localStorage.removeItem("token")
      navigate("/login")
  }

  return (
    <div style={{ width: "100%" }}>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex gap-3 flex-row justify-content-between">
            <li className="nav-item">
              <a
                className="nav-link"
                aria-current="page"
                href="BookInventory"
              >
                Books Inventory
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                aria-current="page"
                href="addBook"
              >
                Add Book
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="IssueBook"
              >
                Issue Books
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="ReturnBook">
                Return Books
              </a>
            </li>
            <li className="nav-item">
              <button className="nav-link active" onClick={handleSignout} aria-cutransactionsrrent="page">
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <h2>Book add form</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label for="name" className="col-sm-3 col-form-label">
            BookName
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              placeholder="Enter book name"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label for="author" className="col-sm-3 col-form-label">
            Author
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              placeholder="Enter password"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Add a book
        </button><br/>
        <a color="teal.500" href="bookInventory">
          Show All Books
        </a>
      </form>
    </div>
  )
};

export default AddBook;
