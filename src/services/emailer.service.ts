const nodemailer = require("nodemailer");

export class EmailerService {
  async sendMail() {
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
      return {
        status: 200,
        message: "Email sent successfully",
      };
    } catch (error) {
      console.log("Email send failed with error:", error);
      return {
        status: 500,
        message: error,
      };
    }
  }
}
