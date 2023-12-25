import React, { useState, useEffect } from 'react';
import axiosInstance from "../config/axiosInstance";
const UserHome = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make an API call when the component mounts
        const response = await axiosInstance.get('book');
        setData(response.data);
      }catch (error) {
        alert(error?.response?.data?.error?error.response.data.error : "Server Error" )
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div className='d-flex' > 
       {data.map((book) => (
            <div key={book.id} style={{border: "1px solid", padding: "20px", margin: "10px"}}>
              <div>Name : {book.name}</div>
              <div>Author : {book.author}</div>
              <div>{book.currentAvailabilityStatus ? 'Available' : 'Not Available'}</div>
            </div>
          ))}
    </div>
  );
};

export default UserHome;