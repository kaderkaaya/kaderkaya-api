const mongoose = require('mongoose');

const Experience = new mongoose.Schema({
  company: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  start_date: { type: String, required: true },
  end_date: { type: String, default: null },
  is_current: { type: Boolean, default: false },
  bullets: { type: [String], required: true },
  technologies: { type: [String], required: true },
  order: { type: Number, required: true },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

module.exports = mongoose.model('Experience', Experience);
