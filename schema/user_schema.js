import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
   _id: Number,
   uname: String,
   password: Number,
   details: {
      email: String,
      contact_number: Number,
      gender: String
   },
}, {collection: 'users'});

export default userSchema;
