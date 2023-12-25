import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import LibraryTransactionModel from '../models/libraryTransactionModel.js';
const secretKey = process.env.JWT_SECRET_KEY || "DFASFSDFDS"

const addUser = async (req, res) => {
  try {
    const { username, password, email, contactNumber, name } = req.body;
    if(!username, !password, !email, !contactNumber, !name){
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingUser = await UserModel.findOne({ username });
    
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await UserModel.create({
      username,
      password: hashedPassword,
      email,
      name,
      contactNumber,
    });

    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username, role: "user" },
      secretKey
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign(
        { userId: user._id, username: user.username, role: user.role },
        secretKey
      );
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Loggin In user");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const showTransactions= async (req,res) =>{
  const transaction = await LibraryTransactionModel.find({ userDetails:req.user.userId });

  res.status(200).json({ message: 'Book borrowed successfully', transaction: transaction });
}

export { getAllUsers ,addUser, loginUser, showTransactions}