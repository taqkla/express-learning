import mongoose, { Schema } from 'mongoose';

const Schema = mongoose.Schema;

const Blog = new Schema({
    id: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author_id: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    deleted_at: Date,
    likes_count: Number,
    category: {
        type: String,
        required: true,
        enum: ["Technical","Political","Spiritual"],
        default: "Spiritual"
    },
    tags: [String]
})

export default Blog;