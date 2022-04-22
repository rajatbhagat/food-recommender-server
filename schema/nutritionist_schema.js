import mongoose from 'mongoose';

const nutritionistSchema = mongoose.Schema({
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
   role: {
      type: String,
      default: 'nutritionist'
   }
}, {collection: 'nutritionist'});

export default nutritionistSchema;
