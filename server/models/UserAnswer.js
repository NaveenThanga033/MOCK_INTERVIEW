const mongoose = require('mongoose');

const userAnswerSchema = new mongoose.Schema({
  mockId: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  correctAns: {
    type: String,
    required: true
  },
  userAns: {
    type: String,
    required: true
  },
  feedback: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('UserAnswer', userAnswerSchema);