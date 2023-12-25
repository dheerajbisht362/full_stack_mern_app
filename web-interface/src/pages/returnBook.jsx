import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosInstance";
import { useAuth } from "../context/authContext";
import axiosConfig from "../config/axiosToken";
import ReturnBookComponent from "../component/returnBookComponent";
import { useNavigate } from "react-router-dom";

const RetrunBook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authData } = useAuth();
  const [data, setData] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();
  function handleSignout(){
      logout()
      localStorage.removeItem("token")
      navigate("/login")
  }

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("book");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      alert(error?.response?.data?.error?error.response.data.error : "Server Error" )
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReturnBook = async (bookname, username) => {
    const date = () => {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate()); // Two weeks from the current date
      return dueDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    };
    try{
      const response = await axiosInstance.post(
        "book/return",
        {
          bookname,date:date(), username
        },
        axiosConfig
      );
      console.log("Book returned", response.data);
      alert(response.data.message)
  }catch (error) {
    alert(error?.response?.data?.error?error.response.data.error : "Server Error" )
  } finally {
    setLoading(false);
  }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if (authData.userRole != "admin") {
    return <p>Unauthorised</p>;
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex gap-3 flex-row justify-content-between">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="BookInventory">
                Books Inventory
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="addBook">
                Add Book
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="IssueBook">
                Issue Books
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="ReturnBook">
                Return Books
              </a>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleSignout} aria-cutransactionsrrent="page">
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {data.length == 0 ? "NO BOOK AVALIABLE" : <ReturnBookComponent books={data} returnBook={handleReturnBook} />}
    </div>
  );
};

export default RetrunBook;
