const mongoose = require("mongoose");
const { Schema } = mongoose;


const BrandsSchema = new Schema({
  brand: {
    type: 'String',
    default: 'N/A',
  },
  image: {
    type: 'String',
    default: 'N/A',
  },
});

module.exports = mongoose.model("brand", BrandsSchema);