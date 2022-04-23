import userModel from "../models/user_model.js";
import mongoose from 'mongoose';

export const getAllUsersDao = async () => {
    return userModel.find();
}

export const getUserByIdDao = (uid) => {
    return userModel.findOne(uid);
}

export const getUserByEmailDao = (email) => {
    return userModel.find({email: email});
}

export const deleteUser = (uid) => {
    userModel.deleteOne(uid)
}

export const updateDaoUser = async (userId,user) => {
    const out = await userModel.updateOne({_id: userId}, {$set: user});
    return out;
}

export const getUserByNameDao = (name) => {
    //TODO: Update this
    return userModel.find(none);
}

export const createUserDao = (user) => {
    return userModel.create(user);
}
export const deleteUserDao = (uid) => {
    userModel.deleteOne(uid)
}
export const updateUserDao = (user, uid) => {
    userModel.updateOne({_id: uid}, {$set: user})
}

export const getUserDetails = (uid) => {
    userDetailsModel.find(uid);
}

export const updateUserDetails = (user) => {}

export const deleteUserDetails = (uid) => {
    userDetailsModel.deleteOne(uid);
}
