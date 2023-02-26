// User model
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');

// Mongoose schema for a User model
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6,
        select: false // Prevents the password from being returned in the response
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date // Date.now() + 10 minutes
});


UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


UserSchema.methods.matchPasswords = async function(password) {
    return await bcrypt.compare(password, this.password);
};


UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {  // this._id is the user id
        expiresIn: process.env.JWT_EXPIRE  // 10 minutes
    });
};


UserSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString('hex'); // Generate token
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex'); // Hash token and set to resetPasswordToken field
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Set to expire in 10 minutes

    return resetToken; // Return unhashed token
};

// User model based on the UserSchema
const User = mongoose.model('User', UserSchema);


module.exports = User;