const express = require('express');
const router = express.Router();
const upload = require('../../middlewere/multer');
const jwt = require('jsonwebtoken');
const randomstring = require("randomstring");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer')
const { v4: uuidv4 } = require('uuid');
const secretKey = 'edawdihinciewfowfgiubaxmapjxoihduiwedbwmcojwoehdigwduwbdwjdowodhw';
const userSchema = require('../.././models/user/User'); 
const shortUuid = uuidv4().slice(0, 5); // slice the first 6 characters


router.post("/user-login", upload.fields([
  { name: "image", maxCount: 1 },
  
]), async (req, res) => {
  try {
    
    const user = await userSchema.findOne({"email": req.body.email});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }else{
      if (user.password == req.body.password)  {
        
        console.log(user.userId);
        const token = jwt.sign({ user: { username:user.firstName, userId:user.userId } }, secretKey);
        res.send({ message: "user login successful",token:token,userData:user})
      }else {
        res.send({ message: " password  not matched"})
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/register-user',upload.fields([
    { name: "image", maxCount: 1 },
  ]), async (req, res) => {
    const lastProduct = await userSchema.findOne().sort({ _id: -1 }).limit(1);
    console.log(lastProduct == undefined );
    console.log(lastProduct  );
    const str2 = await lastProduct ? lastProduct.userId :"SHOPPYUSER00"
    function separateNumberAndString(str2) {
      console.log(str2);
        const regex = /(\D+)(\d+)/; 
        const matches = str2.match(regex);
        if (matches) {
          const stringPart = matches[1];
          const numberPart = matches[2];
          return  +numberPart 
        } else {
          return null;
        }
      }
const sellerNum = separateNumberAndString(str2);
var userId = sellerNum <= 9 ? `SHOPPYUSER0${+sellerNum + 1}`: `SHOPPYUSER${+sellerNum + 1}`
    const image =  req.files.image[0].filename
    console.log(image);
    const userData = await new userSchema({...req.body,image,userId})
    await userData.save()
 
    res.send(userData).status(200)
  });
router.get('/get-all-user', async (req, res) => {
    const userData = await  userSchema.find()
   res.send(userData).status(200)
  });


router.get('/single-user/:id', async (req, res) => {
  const userId = req.params.id
  console.log(userId);
    const userData = await  userSchema.findOne({"userId":userId});
   res.send(userData).status(200)
  });


  
router.post("/user-reset-password", async (req, res) => {
  try {
    const token = req.query.token;
    const tokenData = await userSchema.findOne({ token });
    if (tokenData) {
      // console.log(90,tokenData, token);
      const password = req.body.password;
      // const newPassword = await securePassword(password);
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);

      // console.log(96, secPass);
      const AdminData = await userSchema.findByIdAndUpdate(
        { _id: tokenData._id },
        { $set: { password: secPass, token: "" } },
        { new: true }
      );
      res
        .status(200)
        .send({ success: true, msg: "Password updated successfully" });
    } else {
      res
        .status(200)
        .send({ success: false, msg: "This link has been expired" });
    }
  } catch (errors) {
    console.log(errors);
  }
});

router.post('/user-forgot-password', async (req, res) => {
  const {email} = req.body;
  const userData = await  userSchema.findOne({"email":email});
if(!userData){
  return res.send({success:false,msg:"No User Found"})
}
const name = userData.firstName
const randomString = randomstring.generate();
      console.log(randomString);
      const data = await userSchema.updateOne(
        { email },
        { $set: { token: randomString } },
        { new: true }
      );

  const token = randomString
  sendMail(email,name,token)
    // const userData = await  userSchema.findOne({"userId":userId});
   res.send({success:true,msg:"Send mail sussessfully"}).status(200)
  });
  // const nodemailer = require('nodemailer');

  async function sendMail(email,name,token) {
    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'developer.rajneeshshukla@gmail.com', 
        pass: 'wyqcmrwmfkpwpove' 
      }
    });
  
    try {
      let info = await transporter.sendMail({
        from: 'your-email@gmail.com', 
        to: email, 
        subject: 'Shoppy Kart Frogot Password', 
        html:
        "<p> Hii "+ name  +
        ",Please click on <a href='http://localhost:3000/change-password?token=" +
        token +
        "' >  reset your password</a> for reset your passworrd",
      });
      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error occurred while sending email:', error);
    }
  }
  
  // Call the function to send the email
  // sendMail();
  
module.exports = router;