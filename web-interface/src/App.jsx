import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./config/protectedRoute";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import BookList from "./pages/bookList";
import AddBook from "./pages/addBook";
import IssueBook from "./pages/issueBook";
import RetrunBook from "./pages/returnBook";
import Transactions from "./pages/transactions";

function App() {
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/transactions" element={< Transactions/>} />
            <Route path="/BookInventory" element={<BookList />} />
            <Route path="/addBook" element={<AddBook />} />
            <Route path="/issueBook" element={<IssueBook />} />
            <Route path="/returnBook" element={<RetrunBook />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
