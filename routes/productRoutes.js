const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const upload = require('../middlewares/uploadProduct');
const {
  createProduct, getProducts, getProduct, updateProduct, deleteProduct
} = require('../controllers/productController');

router.post('/', auth,upload.array('product_images', 5), createProduct);
                 
router.get('/', auth,getProducts);
router.get('/:id',auth, getProduct);
router.put('/:id', auth,upload.array('product_images', 5), updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;
