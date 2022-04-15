import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
   _id: Number,
   email: String,
   password: String,
   details: {
      name: String,
      contact_number: Number,
      gender: String
   },
}, {collection: 'users'});

export default userSchema;
