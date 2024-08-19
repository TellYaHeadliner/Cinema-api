const nodeMailer = require('nodemailer')
require('dotenv').config();

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_APP_PASS,
        },
    });
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.to,
        subject: options.subject,
        html: options.message
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;