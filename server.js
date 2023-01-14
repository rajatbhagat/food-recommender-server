import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoDBSession from 'connect-mongodb-session';
import mongoose from 'mongoose';

import userController from './controller/user-controller.js';
import mealController from './controller/meal-controller.js';
import adminController from './controller/admin-controller.js';
import recipeController from './controller/recipe-controller.js';
import ingredientController from './controller/ingredient-controller.js';

const mongoDBSession = MongoDBSession(session);

const mongoURI =
  "mongodb+srv://food:food@cluster0.ajlp3a8.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
.then((res) => {
    console.log("MongoDB connected")
})

const store = new mongoDBSession({
    uri: mongoURI,
    collection: "mySessions",
})


const app = express();
app.use(cors());
app.use(express.json());

app.use(session({
    secret: 'key that will sign cookie',
    resave: false,
    saveUninitialized: false,
    store: store,
}))

userController(app);
mealController(app);
adminController(app);
recipeController(app);
ingredientController(app);

app.get('/', (req, res) => {
    req.session.isAuth = true;
    res.send("Server is running OK.")
});
// Add controller here
userController(app)

app.listen(4000);
