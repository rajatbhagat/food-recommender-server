import mongoose from "mongoose";
import {
    getAllUsersDao,
    getUserByEmailDao,
    updateUserDao
} from "../dao/user_dao.js";

mongoose.connect("mongodb://localhost:27017/foodrecommender")

export const getAllUsers = async (req, res) => {
    const allUsers = await getAllUsersDao();
    res.send(allUsers);
}

export const getUserByEmail = async (req, res) => {
    const user = await getUserByEmailDao(req.params.email)
    res.send(user);
}

export const updateUser = async (req, res) => {
    const newUser = await updateUserDao(req.data, req.params.id);
    res.send(newUser);
}

export default (app) => {
    app.get('/api/users', getAllUsers);
    app.get('/api/users/:email', getUserByEmail)
    app.post('/api/users/', updateUser);
}