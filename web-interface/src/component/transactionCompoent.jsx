import React, { useState, useEffect } from 'react';
import axiosInstance from "../config/axiosInstance";
import axiosConfig from '../config/axiosToken';
const TransactionComponent = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make an API call when the component mounts
        const response = await axiosInstance.get('book/bookshistory', axiosConfig);
        setData(response.data.transaction);
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
       {data.length==0?"No Transactions found":data.map((txn) => (
            <div key={txn._id} style={{border: "1px solid", padding: "20px", margin: "10px"}}>
              <div>Name : {txn.bookDetails.name}</div>
              <div>Author : {txn.bookDetails.author}</div>
              <div>{txn.transaction}</div>
              <div>Due Date {txn.dueDate}</div>
            </div>
          ))}
    </div>
  );
};

export default TransactionComponent;