import ingredientModel from "../models/ingredient_model.js";

const ingredientController = (app) => {
    app.post('/api/ingredient/addingredient', addIngredient)
}

const addIngredient = async (req,res) => {
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
      dbIncred[0]["likedByName"].push(newIngredient.likedByName);
      await ingredientModel.updateOne({ingredientId: dbIncred[0]["ingredientId"]}, {$set: dbIncred[0]});
    }

    res.send(200)
}

export default ingredientController;