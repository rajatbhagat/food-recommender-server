import userModel from "../models/user_model";
import userDetailsModel from "../models/user_details_model";
import { login } from "../service/user_service";

export const createUser = (user) => {
    userModel.create(user);
}
export const login = () => {}
export const deleteUser = (uid) => {
    userModel.deleteOne(uid)
}
export const updateUser = (user) => {}

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
