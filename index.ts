var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  port: 465,               // true for 465, false for other ports
  host: "smtp.gmail.com",
     auth: {
          user: 'shashwot.media@gmail.com',
          pass: 'f966LMyyYYHXnT4',
       },
  secure: true,
  });

var mailOptions = {
  from: 'shashwot.media@gmail.com',  // sender address
  to: 'babudallay@gmail.com',   // list of receivers
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error:any, info:any){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 