import mongoose from "mongoose";
import {
    getAllUsersDao,
    getUserByEmailDao
} from "../dao/user_dao.js";

mongoose.connect("mongodb://localhost:27017/foodrecommender")

export const getAllUsers = async (req, res) => {
    const allUsers = await getAllUsersDao();
    console.log(allUsers.map(t => t.password));
    res.send(allUsers);
}

export const getUserByEmail = async (req, res) => {
    console.log(req.params.email)
    const user = await getUserByEmailDao(req.params.email)
    res.send(user);
}

export default (app) => {
    app.get('/api/users', getAllUsers);
    app.get('/api/user/:email', getUserByEmail);
}