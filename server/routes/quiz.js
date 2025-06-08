const express = require('express');
const Quiz = require('../models/Quiz');
const router = express.Router();
const Result = require('../models/Result');
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: 'Błąd pobierania quizów' });
  }
});
router.post('/', async (req, res) => {
  try {
    const { title, questions, image } = req.body;
    if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: 'Nieprawidłowe dane quizu' });
    }
    const quiz = new Quiz({ title, questions, image });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: 'Błąd dodawania quizu' });
  }
});
router.get('/results/:userId', async (req, res) => {
  try {
    const results = await Result.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Błąd pobierania wyników' });
  }
});
router.post('/result', async (req, res) => {
  try {
    const { userId, quizId, quizTitle, score, total } = req.body;
    const result = new Result({ userId, quizId, quizTitle, score, total });
    await result.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: 'Błąd zapisu wyniku' });
  }
});
router.get('/all-results', async (req, res) => {
  try {
    const results = await Result.find()
      .populate('userId', 'username')
      .sort({ date: -1 });
    res.json(results);
  } catch (err) {
    console.error('Błąd pobierania wyników wszystkich użytkowników:', err);
    res.status(500).json({ error: 'Błąd pobierania wyników wszystkich użytkowników' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz nie znaleziony' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: 'Błąd pobierania quizu' });
  }
});


module.exports = router;