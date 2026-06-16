const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const offerRoutes = require('./routes/offerRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: ['https://admin.amppaclinic.com', 'https://amppa-admin-frontend-qhka.vercel.app', 'http://localhost:3000'],
}));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/offers', offerRoutes);

// Static files (image access)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/blogs/upload', express.static(path.join(__dirname, 'blogs/upload')));
app.use('/products/upload', express.static(path.join(__dirname, 'products/upload')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
