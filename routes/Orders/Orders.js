  const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const SellerSchema = require('../.././models/Seller/Seller')
const upload = require('../../middlewere/multer')
const userSchema = require('../.././models/user/User')

router.get('/get-user-orders/:id', async (req, res) => {
  const { id } = req.params;
  // console.log(id);  
    try {
      const product = await SellerSchema.findOne({ 'orders.orderId': id }, {  _id: 0,'products.$': 1 });

      const order = await userSchema.findOne({ userId: id });
      // console.log(order);
      if (!order) {
        return res.status(404).send({ message: 'Order not found' });
      }
      // const relatedProducts = await SellerSchema.find({ 'products.productCategory': product.products[0].productCategory }, { _id: 0, products: 1 });
      res.send({data:order.orders , 
        // relatedProducts:relatedProducts ,
         massaged:true})
    } catch (errors) {
      console.log(errors);
    }
  });


  // get seller all orders
router.get('/get-seller-all-orders/:id', async (req, res) => {
  const { id } = req.params;
    try {
      // const product = await SellerSchema.findOne({ 'orders.orderId': id }, {  _id: 0,'products.$': 1 });

      const order = await SellerSchema.findOne({ sellerId: id });
      // console.log(order);
      if (!order) {
        return res.status(404).send({ message: 'Order not found' });
      }
      // const relatedProducts = await SellerSchema.find({ 'products.productCategory': product.products[0].productCategory }, { _id: 0, products: 1 });
      res.send({data:order.orders , 
        // relatedProducts:relatedProducts ,
         massaged:true})
    } catch (errors) {
      console.log(errors);
    }
  });
  
  // get seller single order 
router.get('/get-single-seller-orders/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // console.log("single order",id);
    const product = await SellerSchema.findOne({ 'orders.orderId': id }, {  _id: 0,'orders.$': 1 });
    if (!product) { 
      return res.status(404).send({ message: 'Product not found' });
    }
    res.send({data:product.orders[0] ,  massaged:true})
  } catch (errors) {
    console.log(errors);
  }
  });
  // get user single order 
router.get('/get-single-user-orders/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // console.log("single order",id);
    const product = await userSchema.findOne({ 'orders.orderId': id }, {  _id: 0,'orders.$': 1 });
    if (!product) { 
      return res.status(404).send({ message: 'Product not found' });
    }
    res.send({data:product ,  massaged:true})
  } catch (errors) {
    console.log(errors);
  }
  });


router.get('/get-all-orders', async (req, res) => {
    try {
  //  console.log(123345);

      const data = await SellerSchema.find()
      const allProduct = await data && data.map((elm,ind)=>
   elm.orders
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
    const orderId = uuidv4()
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
        { userId: req.body.userData.userId },
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
      console.log(query);
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
  

module.exports = router;