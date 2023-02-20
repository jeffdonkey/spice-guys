const nodemailer = require('nodemailer');

const sendEmail = (options) => {

    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // 2) Define the email options
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text
    };

    // 3) Send the email with nodemailer
    transporter.sendMail(mailOptions, function(err, info) {
        if(err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
};

module.exports = sendEmail;
