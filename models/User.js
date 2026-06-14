const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  role: { type: String, enum: ['admin', 'manager'], default: 'manager' }
});

module.exports = mongoose.model('User', userSchema);
