import ingredientModel from "../models/ingredient_model.js";
import mongoose from "mongoose";

const ingredientController = (app) => {
    app.post('/api/ingredient/addingredient', addIngredient)
    app.get('/api/ingredientData/:id', findIngredientByID);

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