import userModel from "../models/user_model.js";
import mongoose from 'mongoose';


export const createUser = (user) => {
    userModel.create(user);
}



export const deleteUser = (uid) => {
    userModel.deleteOne(uid)
}

export const updateDaoUser = async (userId,user) => {
    console.log("Dao Started")
    console.log(user)
    console.log(typeof userId)
    // const out = userModel.updateOne({_id: ObjectID(userId)}, {$set: user})
    console.log(mongoose.Types.ObjectId(userId))
    console.log(typeof mongoose.Types.ObjectId(userId))
    const one = mongoose.Types.ObjectId(userId)
    user._id = userId
    const out = await userModel.findOneAndUpdate({_id: userId}, {$set: user});
    // console.log(out);
}

export const createUserDetails = (user, userDetails) => {
    userDetailsModel.create(userDetails);
}


export const getUserDetails = (uid) => {
    userDetailsModel.find(uid);
}

export const updateUserDetails = (user) => {}

export const deleteUserDetails = (uid) => {
    userDetailsModel.deleteOne(uid);
}
