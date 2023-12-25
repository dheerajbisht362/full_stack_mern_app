import React from 'react';

const BookListComponent = ({ books, onToggleAvailability, onRemoveBook }) => {
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
            <tr key={book.id}>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.currentAvailabilityStatus ? 'Available' : 'Not Available'}</td>
              <td>
                <button onClick={() => onToggleAvailability(book.name,!book.currentAvailabilityStatus)}>
                  {book.currentAvailabilityStatus ? 'Mark as Unavailable' : 'Mark as Available'}
                </button>
                <button onClick={() => onRemoveBook(book.name)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookListComponent;