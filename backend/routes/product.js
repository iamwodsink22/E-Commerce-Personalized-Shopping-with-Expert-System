const Products = require("../models/Product.js");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken.js");

const router = require("express").Router();

router.post("/createproduct", async (req, res) => {
  console.log(req.body.category);
  x = req.body.category;
  x = x.replace("]", "");
  x = x.replace("[", "");
  x = x.replace("'", "");
  x = x.replace(" ", "");
  z = x.split(",");
  req.body.category = z;

  const newProduct = new Products(req.body);

  try {
    const savedProduct = await newProduct.save();
    return res.status(200).json(savedProduct);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put(
  "/:id",
  verifyTokenAndAdmin,

  async (req, res) => {
    try {
      const updatedProduct = await Products.Ecommerce.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(updatedProduct);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Products.findByIdAndDelete(req.params.id);
    return res.status(200).json("The product has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    console.log("Hello");
    console.log(`'${req.params.id}'`);
    const product = await Products.find({ product_id: req.params.id });
    console.log(product);
    res.status(200).json(product[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/getcategory", async (req, res) => {
  const qCategory = req.query.category;
  

  try {
    let products;
    if (qCategory) {
      products = await Products.find({
        category: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Products.find();
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
});
module.exports = router;
