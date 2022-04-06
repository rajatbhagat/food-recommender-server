import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
   uname: String,
   password: Number,
   details: Number,
}, {collection: 'users'});

export default userSchema;
