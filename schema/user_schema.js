import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   recipe: {
      type: Array,
   },
   meals: {
      type: Array,
   },
   role: {
      type: String,
      default: 'user'
   }
}, {collection: 'users'});

export default userSchema;
