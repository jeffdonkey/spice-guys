// Spice model
const mongoose = require("mongoose");

const SpiceSchema = new mongoose.Schema({
    name: {   // visible on card?
        type: String,
        required: true
    },
    tagline: {  // visible om card?
        type: String,
        required: true
    },
    thumbnailImage: { // visible on card?
        type: String,
        required: true,
        default: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    },
    averageRating: { // visible on card?
        type: Number,
        required: true,
        default: 0,
    },
    description:  String,
    additionalImages: [String],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
}, {timestamps: true}
);

const Spice  = mongoose.model("Spice", SpiceSchema);

module.exports = Spice;