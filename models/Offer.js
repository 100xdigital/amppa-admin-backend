const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    offer_name: { type: String, required: true, trim: true },
    offer_image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);
