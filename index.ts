const nodemailer = require("nodemailer");

async function sendMail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shashwot.media@gmail.com",
      pass: "igfi bakt gsgh graj",
    },
  });

  const mailOptions = {
    from: "shashwot.media@gmail.com",
    to: "babudallay@gmail.com,acstockthankot@gmail.com",
    subject: "Welcome to NodeJS App",
    text: "This is an email using nodemail in nodejs, chalyo re chalyo",
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email send failed with error:", error);
  }
}

sendMail();
