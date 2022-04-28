import mongoose from 'mongoose';
import ingredientSchema from '../schema/ingredient_schema.js';

const ingredientModel = mongoose.model('IngredientModel', ingredientSchema);
export default ingredientModel;