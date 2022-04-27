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


const createRecipe = async (req, res) => {
    
    
    
    if(newUser.userType===undefined || newUser.userType==='user') {
      responseUser = userModel.create(newUser);
    }
    else {
      responseUser = nutritionistModel.create(newUser);
    }

    res.send(responseUser);
   }

   const updateRecipe = async (req, res) => {
    console.log("Starting update user")
    const userId = req.params['uid'];
    const updatedUser = req.body;
    const out = await updateDaoUser(userId,updatedUser);
    if (out) {
        res.send(out);
    } else {
        res.sendStatus(404);
    }
  }

export default recipeController;