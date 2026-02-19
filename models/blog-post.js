const mongoose = require('mongoose');

const BlogPost = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  cover_image: { type: String, default: null },
  published_at: { type: String, required: true },
  tags: { type: [String], required: true },
  order: { type: Number, required: true },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

module.exports = mongoose.model('BlogPost', BlogPost);
