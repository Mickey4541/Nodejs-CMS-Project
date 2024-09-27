const nodemailer = require("nodemailer");

const sendEmail = async (options, job) => {
    var transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            //this is site's mail and password
            user : process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: "rajanbhandari.com <keshavbhandari4541@gmail.com>",
        to: options.email,
        subject: options.subject,
        // text: "Your OTP is " + options.otp,
        text: `Your forget passoword OTP is ${options.otp}. Don't Share this OTP with anyone.`
    };
    await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
