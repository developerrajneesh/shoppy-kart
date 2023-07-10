const express = require('express');
const router = express.Router();
const upload = require('../../middlewere/multer')
const SellerSchema = require('../.././models/Seller/Seller')


router.post("/seller-login", upload.fields([
  { name: "image", maxCount: 1 },
  
]), async (req, res) => {
  try {
    console.log( req.body);
    const user = await SellerSchema.findOne({"email": req.body.email});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }else{
      if (user.password == req.body.password)  { 
        res.send({ message: "seller login successful",sellerData:user})
      }else {
        res.send({ message: " password  not matched"})
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
  
router.post('/register-seller', upload.fields([{ name: "image", maxCount: 1 },]), async (req, res) => {
    const lastProduct = await SellerSchema.findOne().sort({ _id: -1 }).limit(1);
    console.log(lastProduct);
    const str2 = await lastProduct ? lastProduct.sellerId :"SHOPPYSELLER00"
    function separateNumberAndString(str) {
        const regex = /(\D+)(\d+)/; 
        const matches = str.match(regex);
        if (matches) {
          const stringPart = matches[1];
          const numberPart = matches[2];
          return  +numberPart 
        } else {
          return null;
        }
      }
const str = str2
const sellerNum = separateNumberAndString(str);
var sellerId = sellerNum <= 9 ? `SHOPPYSELLER0${+sellerNum + 1}`: `SHOPPYSELLER${+sellerNum + 1}`
    try {  
      const image = req.files.image[0].filename
      const data = await SellerSchema({...req.body,image,sellerId})
      await data.save()
      res.send({ message:"success" , data:data}).status(200)
    } catch (errors) {
      console.log(errors);
    }
  });

module.exports = router;