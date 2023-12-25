import bookModel from '../models/bookModel.js';
import LibraryTransactionModel from '../models/libraryTransactionModel.js';
import UserModel from '../models/userModel.js';

const getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const addBook = async (req, res) => {
  try {
    const { name, author, currentAvailabilityStatus } = req.body;
    if(!name, !author, !currentAvailabilityStatus){
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingBook = await bookModel.findOne({ name });
    
    if (existingBook) {
      return res.status(400).json({ error: "Book already exists" });
    }

    const newBook = await bookModel.create({
      name, author, currentAvailabilityStatus 
    });
    res.json({message: 'Sucessfully added book', book: newBook });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const removeBook = async (req, res) => {
  try {
    const { bookname } = req.body;
    const bookDeleted = await bookModel.findOneAndDelete({ name: bookname });
    res.json({message: 'Sucessfully deleted book', book: bookDeleted });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Loggin In user");
  }
};

const issueBook = async (req, res) => {
  try {
    const { bookname,dueDate, username } = req.body;
    const book = await bookModel.findOne({ name: bookname });
    const user = await UserModel.findOne({ username });
    if (!user || !book) {
      return res.status(401).json({ error: "Invalid book or username" });
    }
    const transaction = await LibraryTransactionModel.create({
      userDetails: user, bookDetails:book, dueDate,transaction:"borrowed", userId: user._id
    });
    res.status(200).json({ message: 'Book borrowed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Loggin In user");
  }
};
const booksHistory = async(req,res)=>{
  try{
    const transaction = await LibraryTransactionModel.find({
      userId:req.user.userId
    });
    res.status(200).json({ transaction, message: 'Fetch successfully' });
  }catch (error) {
    console.error(error);
    res.status(500).send("Error Loggin In user");
  }
}
const returnBook = async (req, res) => {
  try {
    const { bookname,date, username} = req.body;
    const book = await bookModel.findOne({ name: bookname });
    const user = await UserModel.findOne({ username });
    if (!user || !book) {
      return res.status(401).json({ error: "Invalid book or username" });
    }
    const transaction = await LibraryTransactionModel.create({
      userDetails:user, bookDetails:book, dueDate: date ,transaction:"returned",userId: user._id
    });
    res.status(200).json({ message: 'Book return successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Loggin In user");
  }
};

const changeAvailability =  async (req, res) => {
    try {
      const { bookname , availableStatus} = req.body;
      const book = await bookModel.findOne({ name: bookname });
      if (!book) {
        return res.status(400).json({ error: "Book doesn't exists" });
      }
      await bookModel.updateOne(
        { name: bookname },
        { $set: { currentAvailabilityStatus: availableStatus } }
      );
      res.status(200).json({ message: 'Book updated successfully' });

    } catch (error) {
      console.error(error);
      res.status(500).send("Error Loggin In user");
    }
  };

export {getAllBooks, addBook ,removeBook, issueBook, returnBook, changeAvailability, booksHistory}