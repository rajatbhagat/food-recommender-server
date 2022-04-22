import mongoose from 'mongoose';

const mealSchema = mongoose.Schema({
   userid: {
      type: String,
   },
   recipe: {
      type: Array,
   },
}, {collection: 'meal'});

export default mealSchema;
