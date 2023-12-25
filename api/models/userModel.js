import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  password: {type:String, required: true},
  role: {
    type: String,
    enum: ['admin', 'user', 'guest'],
    default: 'user',
  },
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel