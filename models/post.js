const mongoose = require('mongoose');

const Post = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  cover_image: { type: String, default: null },
  external_url: { type: String, required: true },
  published_at: { type: String, required: true },
  tags: { type: [String], required: true },
  featured: { type: Boolean, default: false },
  order: { type: Number, required: true },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

module.exports = mongoose.model('Post', Post);
