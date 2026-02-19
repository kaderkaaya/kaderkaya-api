const mongoose = require('mongoose');

const Visit = new mongoose.Schema({
  sessionId: { type: String, required: true },
  path: { type: String, default: '/' },
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
});

Visit.index({ sessionId: 1, createdAt: 1 });
Visit.index({ createdAt: 1 });

module.exports = mongoose.model('Visit', Visit);
