const express = require("express");
const router = express.Router();
const upload = require('../../middlewere/multer')
const CategorySchema = require("../.././models/Admin/Category");



router.get("/get-all-categories", async (req, res) => {
  const data = await CategorySchema.find()
  res.send(data);
})

router.post("/create-category",upload.fields([
  { name: "categoryImage", maxCount: 1 },
 
]),async (req, res) => {
const image = req.files.categoryImage[0].filename
const {category} =req.body
  const newData = await new CategorySchema({category:category,image:image});
  console.log(req.body,32424);
  await newData.save();
  res.send(newData);
});

router.delete("/delete-category/:id", async (req, res) => {
  const user = await CategorySchema.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json({ message: "Category deleted" });
});

module.exports = router;
