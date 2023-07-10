const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const SellerSchema = require('../.././models/Seller/Seller')
const upload = require('../../middlewere/multer')
const userSchema = require('../.././models/user/User');
const authenticateUser = require('../../middlewere/userAuth');

// get single products
router.get('/product/:id', async (req, res) => {
  const { id } = req.params;
    try {
      // console.log("i Am called");
      const product = await SellerSchema.findOne({ 'products.productId': id }, {  _id: 0,'products.$': 1 });
      if (!product) {
        return res.status(404).send({ message: 'Product not found' });
      }
      res.send({data:product.products[0] ,  massaged:true})
    } catch (errors) {
      console.log(errors);
    }
  });

  // get all seller products
   // get seller all orders
router.get('/get-seller-all-products/:id', async (req, res) => {
  const { id } = req.params;
    try {
      // const product = await SellerSchema.findOne({ 'orders.orderId': id }, {  _id: 0,'products.$': 1 });

      const products = await SellerSchema.findOne({ sellerId: id });
      // console.log(order);
      if (!products) {
        return res.status(404).send({ message: 'products not found' });
      }
      // const relatedProducts = await SellerSchema.find({ 'products.productCategory': product.products[0].productCategory }, { _id: 0, products: 1 });
      res.send({data:products.products , 
        // relatedProducts:relatedProducts ,
         massaged:true})
    } catch (errors) {
      console.log(errors);
    }
  });
// get all products 
router.get('/get-all-products' , async (req, res) => {
    try {
  //  console.log(123345);
      const data = await SellerSchema.find()
      const allProduct = await data && data.map((elm,ind)=>
   elm.products
)
// console.log(allProduct);
      res.json({data:allProduct,massaged:true})
    } catch (errors) {
      console.log(errors);
    }
  });

  // create order 
  router.post('/create-order',upload.fields([
    { name: "image", maxCount: 1 },
  ]), async (req, res) => {
  
    console.log(req.body);
    const orderId1 = uuidv4().slice(0, 7);
    const orderId = "SHOPPYOR"+orderId1.toUpperCase()
    if ( req.body) {
      
      const orderSeller = await SellerSchema.updateOne(
        { sellerId: req.body.sellerId },
        { 
          $push: { 
            orders: {...req.body,orderId}
          } ,
        }
        );
      const orderUser = await userSchema.updateOne(
        { userId: req.body.buyerData.userId },
        { 
          $push: { 
            orders: {...req.body,orderId}
          } ,
        }
        );


        res.send({ message:"success" , data:orderUser}).status(200)
        console.log("saved- orders successfully");
      }else{
        res.send({ message:"Not data found" ,}).status(500)

      }
  });

  
  router.get('/search/:query', async (req, res) => {
    const query = req.params.query.toLowerCase();
    let firstMatchedProduct = null;
    const categoryMatchedProducts = [];
  
    try {
      // find first matched product
      // console.log(query);
      firstMatchedProduct = await SellerSchema.findOne( {products:{productId: query} });
      firstMatchedProduct = await SellerSchema.findOne( {products:{productId: query} });
      const product = await SellerSchema.findOne({ 'products.productId': "SHOPPYPRODUCT08" }, { _id: 0,   'products.$': 1 });
      const category = product.products[0].productCategory;
      console.log(product);
      console.log(category);
      const relatedProducts = await SellerSchema.find({ 'products.category': category }, { _id: 0, products: 1 });
      // const result = data.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()));
      const sellers = await SellerSchema.find({}, { _id: 0, products: 1 });
      console.log(product);
      // console.log(relatedProducts);
      res.send(relatedProducts);  
      // find category matched products
      const categoryMatchedProductsRaw = await SellerSchema.find({ productCategory: { $regex: query, $options: 'i' } }).lean();
      categoryMatchedProductsRaw.forEach(product => {
        if (product.name.toLowerCase().includes(query)) {
          categoryMatchedProducts.push(product);
        }
      });
  
      // create response object with first matched product and category matched products
      const response = {
        firstMatchedProduct,
        categoryMatchedProducts,
        relatedProducts
      };
  
    } catch (err) {
      console.error('Error finding products:', err);
      res.status(500).send('Internal server error');
    }
  });
  


  router.get('/products', async (req, res) => {
    console.log(1234567);
    // const { id } = req.params;
    try {
      // Find the product with the provided _id
      const product = await SellerSchema.findOne({ 'products.productName': "Charger" }, { _id: 0,   'products.$': 1 });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Find all products with the same category
      const category = product.products[0].productCategory;
      console.log(category);
      const relatedProducts = await SellerSchema.find({ 'products.productCategory': category }, { _id: 0, products: 1 });
  
      res.status(200).json({ ... product.products[0], ...relatedProducts[0].products, });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
module.exports = router;