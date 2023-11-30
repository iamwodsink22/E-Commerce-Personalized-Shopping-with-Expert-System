const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_id: { type: String },
    product_name: { type: String, default: "" },
    brand: { type: String, default: "" },
    category: { type: Array, default: [] },
    discounted_price: { type: String, default: "" },
    actual_price: { type: String, default: "" },
    rating: { type: Number, default: 0 },
    rating_count: { type: Number, default: 0 },
    discount_percentage: { type: String, default: "" },
    about_product: { type: String, default: "" },
    img_link: { type: String, default: "0" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);
