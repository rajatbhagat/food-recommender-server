import recipeModel from "../models/recipe_model.js";

const recipeController = (app) => {
    app.post('/api/recipe/addrecipe', addRecipe)
}

const addRecipe = async (req,res) => {
    console.log("REcipe Controller");
    const newRecipe = req.body; 
    console.log("New REcipe",newRecipe)
    const dbRecipe = await recipeModel.find({recipeId: newRecipe.recipeId});
    console.log("DB REcipe",dbRecipe)
    if(dbRecipe.length===0) {
      await recipeModel.create(newRecipe);
    }
    else {
      console.log("DBRecipe 0 "+dbRecipe[0]);
      dbRecipe[0]["likedByName"].push(newRecipe.likedByName);
      await recipeModel.updateOne({recipeId: dbRecipe[0]["recipeId"]}, {$set: dbRecipe[0]});
    }

    res.send(200)
}

export default recipeController;