import mongoose from 'mongoose';
import userScehma from '../schema/user_schema'

const userModel = mongoose.model('UserModel', userScehma);
export default userModel;