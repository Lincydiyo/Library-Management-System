const nodemailer = require("nodemailer");

const sendEmail = async (to, link) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to, 
      subject: "Password Reset Link",
      html: `<p>Click this link to reset your password: <a href="${link}">${link}</a></p>`,
    };

    console.log("Sending email to:", to); 

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Error sending email:", err.message);
    throw err;
  }
};

module.exports = sendEmail;
