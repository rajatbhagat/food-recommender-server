import mongoose from 'mongoose';
import userScehma from '../schema/user_schema.js'

const userModel = mongoose.model('UserModel', userScehma);
export default userModel;