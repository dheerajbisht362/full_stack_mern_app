import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://projectUser:jMYMoVbujlP9A1xw@cluster0.mwuf9.mongodb.net/mern_assignment?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Set up routes
import userRouter from './routes/userRoutes.js'
app.use('/user', userRouter);
import bookRouter from './routes/bookRoutes.js'
app.use('/book', bookRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});