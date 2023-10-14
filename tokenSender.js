const nodemailer = require('nodemailer');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'jatan.bwn2003@gmail.com',
        pass: 'ipvp mdjw qpqp dmqg',
    },
});

// Define the email data


// Send the email
try{transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});}catch(err){console.log(err.message);}
