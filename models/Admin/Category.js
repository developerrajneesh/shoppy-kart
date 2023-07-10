const mongoose = require("mongoose");
const { Schema } = mongoose;
const CategorySchema = new Schema({
  category: {
    type: 'String',
    default: 'N/A',
  },
  image: {
    type: 'String',
    default: 'N/A',
  },
});

module.exports = mongoose.model("category", CategorySchema);