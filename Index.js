const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const DbConnection = require("./dbconfig/db");
const fs = require("fs");
const app = express();
var cors = require("cors");
const path = require('path');
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/", express.static("public/"));
DbConnection();


// app.use(express.static(path.join(__dirname, 'build')));
//   routes
app.use("/api/user/", require("./routes/Users/Products"));
app.use("/api/user/", require("./routes/Users/User"));
app.use("/api/seller/", require("./routes/Seller/CreateProducts"));
app.use("/api/seller/", require("./routes/Seller/SellerAccount"));
app.use("/api/admin/", require("./routes/Admin/Category"));
app.use("/api/admin/", require("./routes/Admin/Brand"));
app.use("/api/orders/", require("./routes/Orders/Orders"));
const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
