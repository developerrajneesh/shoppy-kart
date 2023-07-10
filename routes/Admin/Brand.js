const express = require("express");
const router = express.Router();
const upload = require('../../middlewere/multer')
const BrandSchema = require("../.././models/Admin/Brands");




router.get("/get-all-brands", async (req, res) => {
  const data = await BrandSchema.find()
  res.send(data);
})
router.post("/create-brand",upload.fields([
  { name: "brandImage", maxCount: 1 },
 
]), async (req, res) => {
  console.log(req.files);
  console.log(req.file);
  const image = req.files.brandImage[0].filename
  const {brand} =req.body
    const newData = await new BrandSchema({brand:brand,image:image});
  // console.log(req.body);
  await newData.save();
  res.send(newData);
});

router.delete("/delete-brand/:id", async (req, res) => {
  const user = await BrandSchema.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ message: "User deleted" });
});




module.exports = router;
