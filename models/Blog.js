const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  short_description: String,
  description: String,
  banner_image: String,
  meta_title: String,
  meta_description: String,
  hashtags: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
