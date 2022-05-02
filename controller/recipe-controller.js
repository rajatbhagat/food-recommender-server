import recipeModel from "../models/recipe_model.js";

const recipeController = (app) => {
    app.post('/api/recipe/addrecipe', addRecipe)
    app.get('/api/recipeserver/:id', findRecipeByID);
    app.put('/api/recipe/deleteuserforrecipe',deleteUserfromRecipe)

}

const deleteUserfromRecipe = async (req, res) => {
  console.log("DEleting recipe")
  const data = req.body;
  const id = data.recipe;
  const user = data.user;
  const us = {}
  us.userId = user._id;
  us.name = user.name;
  console.log("User")
  console.log(us);
  const dbRecipe = await recipeModel.find({recipeId:id});
  console.log("Found REcipe:" ,dbRecipe[0]);
  dbRecipe[0]["likedBy"] = dbRecipe[0]["likedBy"].filter(item => item.userId!=us.userId);
  console.log("Updating Recipe ",dbRecipe[0]);
  await recipeModel.updateOne({recipeId: dbRecipe[0]["recipeId"]}, {$set: dbRecipe[0]});
  res.send(200)
}

const findRecipeByID = async (req, res) => {
  try {
    const id = req.params['id']
    const response = await recipeModel.find({ recipeId: id });
    res.send(response)
  } catch (err) {
    console.log("Error while finding recipe by id", req.params)
    console.log(err)
  }
}

const addRecipe = async (req,res) => {
  try {
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
      dbRecipe[0]["likedBy"].push(newRecipe.likedBy);
      await recipeModel.updateOne({recipeId: dbRecipe[0]["recipeId"]}, {$set: dbRecipe[0]});
    }

    res.send(200)
  } catch (err) {
    console.log("Error while adding recipe", req.body)
    console.log(err)
  }
}

export default recipeController;