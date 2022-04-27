import mongoose from 'mongoose';

const mealSchema = mongoose.Schema({
   name: {
      type: String,
   },
   recipe: {
      type: Array,
   },
   nutritionist: {
      type:String,
   }, nutritionist_name:{
      type:String,
   }
}, {collection: 'meal'});

export default mealSchema;
