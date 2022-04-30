import mongoose from 'mongoose';

const recipeSchema = mongoose.Schema({
   recipeId: {
      type: String,
      required: true,
   },
   recipeName: {
    type: String,
    }, 
   likedBy: {
       type: Array
   }
}, {collection: 'recipe'});

export default recipeSchema;
