const mongoose = require("mongoose");
const { Schema } = mongoose;

const SpicesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default:
      "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now(),
  }
});

const Spices = mongoose.model("spices", SpicesSchema);

module.exports = Spices;
