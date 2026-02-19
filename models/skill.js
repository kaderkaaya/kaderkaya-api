const mongoose = require('mongoose');

const Skill = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  icon: { type: String, required: true },
  order: { type: Number, required: true },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

module.exports = mongoose.model('Skill', Skill);
