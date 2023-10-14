const express = require('express'); 
const jwt = require('jsonwebtoken'); 
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const OTP = require('./model/Otp')
const connectToMongo = require('./config/db');
connectToMongo();
const app = express(); 
const PORT = 3000; 
app.use(express.json())

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'jatan.bwn2003@gmail.com',
        pass: 'ipvp mdjw qpqp dmqg',
    },
});
app.get('/verify',async (req, res)=>{ 
	const email = req.body.email;
	const otp  = req.body.otp;
	const sent = await OTP.findOne({email});
	// console.log(sent);
	if(sent){
		if(sent.otp===otp){
			const delOTP = await OTP.findOneAndDelete({email:email});
			res.send("OTP verified")
		}
		else{
			res.send('Invalid OTP')
		}
	}
}); 
app.post('/send/email', async(req, res)=>{
	let email = req.body.email
	// console.log(email)
	const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
	const mailOptions = {
		from: 'jatan.bwn2003@gmail.com',
		to: email,
		subject: 'Verify Email',
		text: `your verifcation code is : ${otp}`,
	};
	try{transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log('Error sending email:', error);
		} else {
			console.log('Email sent:', info.response);
		}
	});}catch(err){console.log(err.message);}
	let isSent = await OTP.findOne({email})
	if(isSent){
		let delOpt = await OTP.deleteOne({email: email})
	}
	let sentOtp = await OTP.create({email,otp})
	if(sentOtp){
		res.send('otp sent')
	}
	else{
		res.send('error in sending OTP')
	}
})

app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
	else
		console.log("Error occurred, server can't start", error); 
	} 
); 
