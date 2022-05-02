import ingredientModel from "../models/ingredient_model.js";
import mongoose from "mongoose";

const ingredientController = (app) => {
    app.post('/api/ingredient/addingredient', addIngredient)
    app.get('/api/ingredientData/:id', findIngredientByID);
    app.put('/api/ingredient/deleteuseringredient',deleteUserfromIngredient)

}

const deleteUserfromIngredient = async (req, res) => {
    console.log("DEleting ingredient")
    const data = req.body;
    const id = data.ingredient;
    const user = data.user;
    const us = {}
    us.userId = user._id;
    us.name = user.name;
    console.log("User")
    console.log(us);
    const ingredRecipe = await ingredientModel.find({ingredientId:id});
    console.log("Found ingredientModel:" ,ingredRecipe[0]);
    ingredRecipe[0]["likedBy"] = ingredRecipe[0]["likedBy"].filter(item => item.userId!=us.userId);
    console.log("Updating ingredientModel ",ingredRecipe[0]);
    await ingredientModel.updateOne({ingredientId: ingredRecipe[0]["ingredientId"]}, {$set: ingredRecipe[0]});
    res.send(200)
  }

const findIngredientByID = async (req, res) => {
  try {
    let id = req.params['id']
    const response = await ingredientModel.find({ ingredientId: id });
    res.send(response)
  } catch (err) {
    console.log("error while finding ingredient by id", req.params);
    console.log(err)
  }
}


const addIngredient = async (req,res) => {
  try {
    console.log("Ingredient Controller");
    const newIngredient = req.body; 
    console.log("New Ingredient",newIngredient)
    const dbIncred = await ingredientModel.find({ingredientId: newIngredient.ingredientId});
    console.log("DB Ingredient",dbIncred)
    if(dbIncred.length===0) {
      await ingredientModel.create(newIngredient);
    }
    else {
      console.log("dbIncred 0 "+dbIncred[0]);
      dbIncred[0]["likedBy"].push(newIngredient.likedBy);
      await ingredientModel.updateOne({ingredientId: dbIncred[0]["ingredientId"]}, {$set: dbIncred[0]});
    }

    res.send(200)
  } catch (err) {
    console.log("error while adding ingredient")
    console.log(err)
  }
}

export default ingredientController;