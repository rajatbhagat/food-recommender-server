import mealModel from "../models/meal_model.js";
import mongoose from 'mongoose';


export const createMeal = (meal) => {
    mealModel.create(meal);
}