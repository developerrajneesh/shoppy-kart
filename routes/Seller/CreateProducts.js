const express = require('express');
const router = express.Router();
const upload = require('../../middlewere/multer')
const { v4: uuidv4 } = require('uuid');

const SellerSchema = require('../.././models/Seller/Seller')

const shortUuid = uuidv4().slice(0, 5); // slice the first 6 characters

router.post('/create-products',upload.fields([
    { name: "productImg1", maxCount: 1 },
    { name: "productImg2", maxCount: 1 },
    { name: "productImg3", maxCount: 1 },
  ]), async (req, res) => {

    console.log(req.body);
  
        var productId = "SHOPPYPR"+ req.body.sellerName.slice(0, 3).toUpperCase()+ req.body.sellerId.slice(12)+shortUuid.toUpperCase()
         console.log(productId);

        //  productId = await productNum <= 9 ? `SHOPPY${sellerShortId}0${+productNum + 1}`: `SHOPPY${sellerShortId}${+productNum + 1}`
    
    try {
        const productImg1 = req.files.productImg1[0].filename
        const productImg2 = req.files.productImg2[0].filename
        const productImg3 = req.files.productImg3[0].filename


        const addCar = await SellerSchema.updateOne(
            { sellerId: req.body.sellerId },
            { 
              $push: { 
                products: {
                    productId: productId,
                    sellerId: req.body.sellerId,
                    sellerName: req.body.sellerName,
                    productName: req.body.productName ,
                    productTitle: req.body.productTitle ,
                    productImg1:productImg1,
                    productImg2:productImg2,
                    productImg3:productImg3,
                    productPrice: req.body.productPrice,
                    productDiscount: req.body.productDiscount,
                    productCategory: req.body.productCategory ,
                    productBrand: req.body.productBrand,
                    productStock: req.body.productStock,
                    productActualPrice:req.body.productActualPrice,
                    ProductDiscription:  req.body.ProductDiscription,
                 }
               } ,
             }
            );
      res.send({ message:"success" , data:addCar}).status(200)
    } catch (errors) {
      console.log(errors);
    }
  });

module.exports = router;