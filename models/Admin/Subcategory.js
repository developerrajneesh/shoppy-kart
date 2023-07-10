const mongoose = require("mongoose");
const { Schema } = mongoose;
const SubcategorySchema = new Schema({
    subcategory: {
    type: 'String',
    default: 'N/A',
  },
  image: {
    type: 'String',
    default: 'N/A',
  },
});

module.exports = mongoose.model("subcategory", SubcategorySchema);