const mongoose = require("mongoose");
const { Schema } = mongoose;

const SpiceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tagline: {
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
    required: true
  },
});

const Spice = mongoose.model("spice", SpiceSchema);

module.exports = Spice;
