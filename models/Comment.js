// Comment model
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: [true, "Please provide a rating between 1 and 10"],
        min: 1,
        max: 10
    },
    comment: {
        type: String,
        maxlength: 500
    },
    creatorName: String,
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
} , {timestamps: true});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;