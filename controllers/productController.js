


const Product = require('../models/Product');

// Create a new product

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      stock,
      title,
      short_description,
      long_description,
      tags
    } = req.body;

    let parsedTags = [];
    if (tags) {
      try {
        parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
      } catch (err) {
        parsedTags = [];
      }
    }

    // req.files is an array of uploaded files (because you use upload.array)
    const product_images = req.files
      ? req.files.map(file => `/products/upload/${file.filename}`)
      : [];

    const { v4: uuidv4 } = require('uuid');

    const newProduct = new Product({
      product_id: uuidv4(),
      name,
      category,
      price,
      stock,
      title,
      short_description,
      long_description,
      product_images,
      tags: parsedTags
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Fetch products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single product by ID
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error('Fetch product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update product
// Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const {
      name,
      category,
      price,
      stock,
      title,
      short_description,
      long_description,
      tags
    } = req.body;

    if (req.files && req.files.length > 0) {
      product.product_images = req.files.map(
        (file) => `/products/upload/${file.filename}`
      );
    }

    let parsedTags = [];
    if (tags) {
      try {
        parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;
      } catch (err) {
        parsedTags = product.tags;
      }
    }

    product.name = name || product.name;
    product.category = category || product.category;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.title = title || product.title;
    product.short_description = short_description || product.short_description;
    product.long_description = long_description || product.long_description;
    product.tags = parsedTags;

    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
