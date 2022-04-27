import mealModel from '../models/meal_model.js';
import { createMeal } from '../dao/meal_dao.js';

const mealController = (app) => {
    app.post('/api/meals/addMeal',addMeal);
    app.get('/api/meals/:nutritionist', findMealByNutritionist);
}

const addMeal = async (req,res) => {
    console.log("ADD Meal CONTROLLER")
    let meal = req.body;
    // meal.nutritionist =

    console.log("Here:")
    console.log(meal)
    const out = createMeal(meal);
    console.log(out);
    res.send(200);
}

const findMealByNutritionist = async (req, res) => {
    const nutritionist = req.params['nutritionist']
    const response = await mealModel.find({ nutritionist: nutritionist });
    res.send(response)
}

export default mealController;