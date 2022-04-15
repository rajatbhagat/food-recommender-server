import userModel from "../models/user_model.js";

export const getAllUsersDao = async () => {
    return userModel.find();
}

export const getUserByIdDao = (uid) => {
    return userModel.findOne(uid);
}

export const getUserByEmailDao = (email) => {
    return userModel.find({email: email});
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
export const updateUserDao = (user) => {}
