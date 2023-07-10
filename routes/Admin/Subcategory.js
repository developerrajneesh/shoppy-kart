const express = require("express");
const router = express.Router();
const upload = require('../../middlewere/multer')
const SubcategorySchema = require("../.././models/Admin/Subcategory");



router.get("/get-all-subcategory", async (req, res) => {
  const data = await SubcategorySchema.find()
  res.send(data);
})

router.post("/create-subcategory",upload.fields([
  { name: "categoryImage", maxCount: 1 },
 
]),async (req, res) => {
const image = req.files.subcategoryImage[0].filename
const {category} =req.body
  const newData = await new SubcategorySchema({category:subcategory,image:image});
  await newData.save();
  res.send(newData);
});

router.delete("/delete-category/:id", async (req, res) => {
  const user = await SubcategorySchema.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "Subcategory not found" });
  }
  res.json({ message: "Subcategory deleted" });
});

module.exports = router;
