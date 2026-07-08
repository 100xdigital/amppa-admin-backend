const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://amppaadmin:Amppa2026Secure!@cluster0.fezcypo.mongodb.net/amppa_admin?retryWrites=true&w=majority&appName=Cluster0";

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

const Blog = mongoose.model('Blog', blogSchema);

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected');
  const data = JSON.parse(require('fs').readFileSync('blogs_clean.json', 'utf8'));
  const docs = data.map(d => ({
    title: d.title,
    short_description: d.short_description,
    description: d.description,
    banner_image: d.banner_image,
    meta_title: d.meta_title,
    meta_description: d.meta_description,
    hashtags: d.hashtags,
    createdAt: d.createdAt && d.createdAt.$date ? new Date(d.createdAt.$date) : undefined,
    updatedAt: d.updatedAt && d.updatedAt.$date ? new Date(d.updatedAt.$date) : undefined,
  }));
  const result = await Blog.insertMany(docs);
  console.log('Inserted:', result.length);
  await mongoose.disconnect();
}

run().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
