import mealModel from '../models/meal_model.js';
import { createMeal } from '../dao/meal_dao.js';
import mongoose from "mongoose";
import {response} from "express";

const mealController = (app) => {
    app.post('/api/meals/addMeal',addMeal);
    app.get('/api/meals/:nutritionist', findMealByNutritionist);
    app.get('/api/mealData/:id', findMealByID);
    app.get('/api/allmeals/', findAllMeals);
}

const addMeal = async (req,res) => {
    try {
    console.log("ADD Meal CONTROLLER")
    let meal = req.body;

    console.log("Here:")
    console.log(meal)
    const out = createMeal(meal);
    console.log(out);
    res.send(200);
    } catch (err) {
        console.log("error while adding meal", req.body)
        console.log(err)
    }
}

const findMealByNutritionist = async (req, res) => {
    try {
    const nutritionist = req.params['nutritionist']
    const response = await mealModel.find({ nutritionist: nutritionist });
    res.send(response)
    } catch (err) {
        console.log("Error while finding meal by nutritionist", req.params);
        console.log(err)
    }
}

const findMealByID = async (req, res) => {
    try {
    let id = req.params['id']

    id = mongoose.Types.ObjectId(id);

    const response = await mealModel.find({ _id: id });
    res.send(response)
    } catch (err) {
        console.log("error while finding meal by ID", req.params);
        console.log(err)
    }
}

const findAllMeals = async (req,res) => {
    try {
    const response = await mealModel.find();
    res.send(response)
    } catch(err) {
        console.log("error while finding all meals")
        console.log(err)
    }

}

export default mealController;