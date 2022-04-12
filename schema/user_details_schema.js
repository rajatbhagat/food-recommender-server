import mongoose from 'mongoose';

const userDetailsSchema = mongoose
    .Schema({

    }, {collection: 'users_details'});

export default userDetailsSchema;
