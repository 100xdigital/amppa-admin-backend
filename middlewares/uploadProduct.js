const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create upload directory for products
const uploadDir = path.join(__dirname, '../products/upload');

// Ensure the folder exists
if (!fs.existsSync(uploadDir)) {z
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Multer middleware
const upload = multer({ storage, fileFilter });

module.exports = upload;
