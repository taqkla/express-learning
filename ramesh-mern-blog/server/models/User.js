const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    bio: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const UserModal = model('User', UserSchema);

module.exports = UserModal;