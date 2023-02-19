const crypto = require("crypto");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");


// Register user
exports.register = async (req, res, next) => {
    // res.send("Register route");
    const { username, email, password } = req.body;

    try {
        const user = await User.create({
            username,
            email,
            password
        });

        sendToken(user, 201, res); // replaces res.status(201).json({ success: true, token: "randomstring" });

    } catch (error) {
        next(error); // replaces res.status(500).json({ success: false, error: error.message });
    }
};


// Login user
exports.login = async (req, res, next) => {
    // res.send("Login route");
    const { email, password } = req.body;

    // Check that email and password is entered
    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400)); // replaces res.status(400).json({ success: false, error: "Please provide an email and password" });
    }

    // Check for user in database
    try {
        // Check that user email exists
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 401)); // replaces res.status(401).json({ success: false, error: "Invalid credentials" });
        }

        // Check that password matches
        const isMatch = await user.matchPasswords(password);
        if (!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401)); // replaces res.status(401).json({ success: false, error: "Invalid credentials" });
        }

        sendToken(user, 200, res); // replaces res.status(200).json({ success: true, token: "randomString" });
    } catch (error) {
        next(error); // replaces res.status(500).json({ success: false, error: error.message });
    }
};


// Forgot password
exports.forgotPassword = async (req, res, next) => {
    // res.send("Forgot password route");
    const { email } = req.body;

    try {
        const user = await User.findOne({ email }); // find user by email

        if (!user) {
            return next(new ErrorResponse("Email could not be sent", 404)); // replaces res.status(404).json({ success: false, error: "Email could not be sent" });
        }

        const resetToken = user.getResetPasswordToken(); // get reset token

        await user.save(); // save user with reset token and expiration

        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`; // create reset url to email to user

        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `; // create message to go in email

        try {
            await sendEmail({
                to: user.email,
                subject: "Password reset request",
                text: message,
            });

            res.status(200).json({ success: true, data: "Email sent" });

        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email could not be sent", 500)); // replaces res.status(500).json({ success: false, error: "Email could not be sent" });
        }
    } catch (error) {
        next(error); // replaces res.status(500).json({ success: false, error: error.message });
    }
};


// Reset user password
exports.resetPassword = async (req, res, next) => {
    // res.send("Reset password route");
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return next(new ErrorResponse("Invalid reset token", 400)); // replaces res.status(400).json({ success: false, error: "Invalid reset token" });
        }

        // Set new password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
            success: true,
            data: "Password reset successfully",
            token: user.getSignedJwtToken(),
        });

    } catch (error) {
        next(error); // replaces res.status(500).json({ success: false, error: error.message });
    }
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ success: true, token });
};
