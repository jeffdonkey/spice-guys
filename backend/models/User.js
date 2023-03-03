const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
        minlength: 8
    },
    date: {
      type: Date,
      default: Date.now
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
