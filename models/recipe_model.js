import mongoose from 'mongoose';
import recipeScehma from '../schema/recipe_schema.js'

const recipeModel = mongoose.model('RecipeModel', recipeScehma);
export default recipeModel;