import mongoose, { Schema } from 'mongoose';

const Schema = mongoose.Schema;

const validateEmail = function(email) {
    const regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return regex.test(email);
};

const Users = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [validateEmail, "Please enter a valid email"]
    },
    bio: String
})

export default Users;