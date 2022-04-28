import mongoose from 'mongoose';

const ingredientSchema = mongoose.Schema({
    ingredientId: {
      type: String,
      required: true,
   },
   ingredientName: {
    type: String,
    }, 
    likedByName: {
       type: Array
   }
}, {collection: 'ingredient'});

export default ingredientSchema;
