const mongoose = require('mongoose');

const Project = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  bullets: { type: [String], required: true },
  tags: { type: [String], required: true },
  repo_url: { type: String, default: null },
  live_url: { type: String, default: null },
  featured: { type: Boolean, default: false },
  order: { type: Number, required: true },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

module.exports = mongoose.model('Project', Project);
