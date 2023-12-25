import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true , unique:true},
    author: { type: String, required: true },
    currentAvailabilityStatus: { type: Boolean, required: true }   
});

const bookModel = mongoose.model('Book', bookSchema);

export default bookModel