import React, { useState } from "react";

const IssueBookComponent = ({ books, issueBook }) => {
  const [usernames, setUsernames] = useState({});

  const handleIssueBook = (book) => {
    issueBook(book.name,usernames[book._id]);
  };

  const handleInputChange = (bookId, value) => {
    console.log(bookId, value)
    setUsernames((prevUsernames) => ({
      ...prevUsernames,
      [bookId]: value,
    }));
  };
  return (
    <div>
      <h2>Book List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>
                {book.currentAvailabilityStatus ? "Available" : "Not Available"}
              </td>
              <td className="d-flex">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter user name"
                  value={usernames[book._id] || ""}
                  onChange={(e) => handleInputChange(book._id, e.target.value)}
                />
                <button onClick={() => handleIssueBook(book)}>
                  IssueBook
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssueBookComponent;
