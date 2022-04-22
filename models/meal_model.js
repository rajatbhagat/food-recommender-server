import mongoose from 'mongoose';
import mealSchema from '../schema/meal_schema.js'

const mealModel = mongoose.model('MealModel', mealSchema);
export default mealModel;