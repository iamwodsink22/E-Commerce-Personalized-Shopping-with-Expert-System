const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, default: "" },
    phone: { type: Number },
    country: { type: String, default: "" },
    state: { type: String, default: "" },
    city: { type: String, default: "" },
    address: { type: String, default: "" },
    zip: { type: Number, default: 0 },
    about: { type: String, default: "" },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "buyer",
      required: false,
    },
    image: {
      type: Object,
      required: false,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
