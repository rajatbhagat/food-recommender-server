import mongoose from 'mongoose';

const userDetailsSchema = mongoose
    .Schema({
       userId: Number,
       email: String,
       contact_number: Number,
    }, {collection: 'users_details'});

export default userDetailsSchema;
