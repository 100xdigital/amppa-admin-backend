const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
 try {
    const { title, short_description, description, meta_title, meta_description,hashtags } = req.body;
const banner_image = req.file ? `/blogs/upload/${req.file.filename}` : null;
    const newBlog = new Blog({
      title,
      short_description,
      description,
      banner_image,
      meta_title,
      meta_description,
      author: req.user._id , // assuming you attach logged-in user info to req.user after auth
      hashtags: hashtags ? (Array.isArray(hashtags) ? hashtags : hashtags.split(",")) : []
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog by ID:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const { title, short_description, description, meta_title, meta_description ,hashtags} = req.body;
  // If a new image is uploaded, replace the banner_image field
  if (hashtags) {
  blog.hashtags = Array.isArray(hashtags) ? hashtags : hashtags.split(",");
}
    if (req.file) {
      blog.banner_image = `/blogs/upload/${req.file.filename}`;
    }
    blog.title = title || blog.title;
    blog.short_description = short_description || blog.short_description;
    blog.description = description || blog.description;
    blog.meta_title = meta_title || blog.meta_title;
    blog.meta_description = meta_description || blog.meta_description;

    await blog.save();
    res.json(blog);
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
