import mealModel from '../models/meal_model.js';
import { createMeal } from '../dao/meal_dao.js';
import {response} from "express";

const mealController = (app) => {
    app.post('/api/meals/addMeal',addMeal);
    app.get('/api/meals/:nutritionist', findMealByNutritionist);
    app.get('/api/mealData/:id', findMealByID);
    app.get('/api/allmeals/', findAllMeals);
    

}

const addMeal = async (req,res) => {
    console.log("ADD Meal CONTROLLER")
    let meal = req.body;

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

const findMealByID = async (req, res) => {
    const id = req.params['id']
    const response = await mealModel.find({ _id: id });
    res.send(response)
}

const findAllMeals = async (req,res) => {

    const response = await mealModel.find();
    res.send(response)

}

export default mealController;