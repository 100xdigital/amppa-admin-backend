const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://amppaadmin:Amppa2026Secure!@cluster0.fezcypo.mongodb.net/amppa_admin?retryWrites=true&w=majority&appName=Cluster0";

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const blogSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true, sparse: true },
  short_description: String,
  description: String,
  banner_image: String,
  meta_title: String,
  meta_description: String,
  hashtags: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected');

  const blogs = await Blog.find({ $or: [{ slug: { $exists: false } }, { slug: null }] });
  console.log('Blogs needing a slug:', blogs.length);

  for (const blog of blogs) {
    let base = generateSlug(blog.title);
    let slug = base;
    let counter = 1;
    while (await Blog.findOne({ slug, _id: { $ne: blog._id } })) {
      counter++;
      slug = `${base}-${counter}`;
    }
    blog.slug = slug;
    await blog.save();
    console.log(`Set slug for "${blog.title}" -> ${slug}`);
  }

  console.log('Done.');
  await mongoose.disconnect();
}

run().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
