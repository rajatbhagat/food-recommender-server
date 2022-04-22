import mongoose from 'mongoose';
import nutritionistSchema from '../schema/nutritionist_schema.js'

const nutritionistModel = mongoose.model('NutritionistModel', nutritionistSchema);
export default nutritionistModel;