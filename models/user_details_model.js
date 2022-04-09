import mongoose from 'mongoose';
import userDetailsSchema from '../schema/user_details_schema'

const userDetailsModel = mongoose
              .model('UserDetailsModel', userDetailsSchema);
export default userDetailsModel;