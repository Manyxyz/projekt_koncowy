const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: Number // index poprawnej odpowiedzi
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema],
  image: String
});

module.exports = mongoose.model('Quiz', quizSchema);