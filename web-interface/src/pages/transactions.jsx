import React from 'react';
import UserHome from '../component/userHome';
import TransactionComponent from '../component/transactionCompoent';
import { useAuth } from "../context/authContext";
import { useNavigate } from 'react-router-dom';
const Transactions= () => {
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
              <a className="nav-link" aria-current="page" href="/">
                Books
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-cutransactionsrrent="page" href="transactions">
                Transactions
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
      <TransactionComponent/>
    </div>
  );
};


export default Transactions;