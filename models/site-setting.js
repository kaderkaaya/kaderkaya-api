const mongoose = require('mongoose');

const SiteSetting = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String, required: true },
  summary: { type: String, required: true },
  avatar_url: { type: String, default: null },
  email: { type: String, required: true },
  github_url: { type: String, required: true },
  linkedin_url: { type: String, required: true },
  medium_url: { type: String, required: true },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

module.exports = mongoose.model('SiteSetting', SiteSetting);
