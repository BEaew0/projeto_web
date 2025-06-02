// ./mail‑transport.js
const nodemailer = require("nodemailer");

function createTransport() {
  if (process.env.NODE_ENV === "production") {
    // 🚀  Real emails
    return nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  // 🧪  Captured by Ethereal
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.ETHEREAL_USERNAME,
      pass: process.env.ETHEREAL_PASSWORD,
    },
  });
}

module.exports = createTransport;