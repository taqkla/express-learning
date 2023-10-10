const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PostSchema = new Schema({
    title: { type: String },
    content: { type: String },
    // userId: { type: Schema.Types.ObjectId, ref: 'User' }, // TODO: Once we have the frontend
    userId: { type: String },
    category: { type: String },
    likes: { type: Number },
    tags: { type: String },
}, {
    timestamps: true
});

const PostModal = model('Post', PostSchema);

module.exports = PostModal;