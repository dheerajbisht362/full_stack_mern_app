import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosInstance";
import { useAuth } from "../context/authContext";
import BookListComponent from "../component/bookListComponent";
import axiosConfig from "../config/axiosToken";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authData } = useAuth();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("book");
      console.log(response.data);
      setData(response.data);
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
    console.log(authData)
    return <p>Unauthorised</p>;
  }
  const handleToggleAvailability = async (bookname, status) => {
    const response = await axiosInstance.post(
      "book/changeAvailable",
      {
        bookname,
        availableStatus: status,
      },
      axiosConfig
    );
    console.log("Book Status Changed", response.data);
    fetchData();
  };

  const handleRemoveBook = async (bookname) => {
    const response = await axiosInstance.post(
      "book/remove",
      {
        bookname,
      },
      axiosConfig
    );
    console.log("Book removed", response.data);
    fetchData();
  };
  const { logout } = useAuth();
  const navigate = useNavigate();
  function handleSignout(){
      logout()
      localStorage.removeItem("token")
      navigate("/login")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex gap-3 flex-row justify-content-between">
            <li className="nav-item">
              <a
                className="nav-link active"
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
              <button className="nav-link" onClick={handleSignout} aria-cutransactionsrrent="page">
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {data.length == 0 ? (
        "NO BOOK AVALIABLE"
      ) : (
        <BookListComponent
          books={data}
          onToggleAvailability={handleToggleAvailability}
          onRemoveBook={handleRemoveBook}
        />
      ) }
    </div>
  );
};

export default BookList;
