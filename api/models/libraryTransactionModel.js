import mongoose from 'mongoose'

const libraryTransactionSchema = new mongoose.Schema({
  userDetails: { type: Object, required: true },
  userId:{ type: String, required: true },
  bookDetails: { type: Object, required: true },
  dueDate: { type: String, required: true },
  transaction: {
    type: String,
    enum: ['borrowed','returned'],
    default: 'user',
  },
});


const LibraryTransactionModel = mongoose.model('LibraryTransaction', libraryTransactionSchema);

export default LibraryTransactionModel