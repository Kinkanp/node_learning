const nodemailer = require('nodemailer');
const { config } = require("./config");

module.exports = {
  async send(email, html) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: config.mail.domain,
        pass: config.mail.password,
      },
    });

    return transporter.sendMail({
      from: config.mail.domain,
      to: email,
      subject: "Email confirmation",
      text: `Please confirm your email. Current time: ${new Date().toISOString()}`,
      html
    });
  }
}
