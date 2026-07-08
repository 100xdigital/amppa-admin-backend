const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const upload = require('../middlewares/uploadMiddleware');
const { createBlog, getBlogs, getBlogById, getBlogBySlug, updateBlog, deleteBlog } = require('../controllers/blogController');

// Public (no login needed)
router.get('/', getBlogs);
router.get('/slug/:slug', getBlogBySlug);
router.get('/:id', getBlogById);

// Admin-only
router.post('/', auth,upload.single('banner_image'), createBlog);
router.put('/:id', auth,upload.single('banner_image'), updateBlog);
router.delete('/:id', auth, deleteBlog);

module.exports = router;
