import mealModel from '../models/meal_model.js';
import { createMeal } from '../dao/meal_dao.js';

const mealController = (app) => {
    app.post('/api/meals/addMeal',addMeal);
}

const addMeal = async (req,res) => {
    console.log("ADD Meal CONTROLLER")
    const meal = req.body;
    
    console.log(meal)
    const out = createMeal(meal);
    console.log(out);
    res.send(200);
}

export default mealController;