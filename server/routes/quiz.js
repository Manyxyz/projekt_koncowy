const express = require('express');
const Quiz = require('../models/Quiz');
const router = express.Router();
const Result = require('../models/Result');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('author', 'username');
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: 'Błąd pobierania quizów' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, questions, image, author } = req.body;
    if (!title || !questions || !Array.isArray(questions) || questions.length === 0 || !author) {
      return res.status(400).json({ error: 'Nieprawidłowe dane quizu' });
    }
    const quiz = new Quiz({ title, questions, image, author });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: 'Błąd dodawania quizu' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, questions, image, author } = req.body;
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz nie znaleziony' });
    quiz.title = title;
    quiz.questions = questions;
    quiz.image = image;
    await quiz.save();
    res.json(quiz);
  } catch (err) {
    res.status(400).json({ error: 'Błąd edycji quizu' });
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
router.post('/result', authMiddleware, async (req, res) => {
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
    const results = await Result.aggregate([
      {
        $sort: { score: -1, date: 1 }
      },
      {
        $group: {
          _id: { userId: "$userId", quizId: "$quizId" },
          doc: { $first: "$$ROOT" }
        }
      },
      {
        $replaceRoot: { newRoot: "$doc" }
      },
      {
        $sort: { date: -1 }
      }
    ]);
    await Result.populate(results, { path: 'userId', select: 'username' });
    res.json(results);
  } catch (err) {
    console.error('Błąd pobierania najlepszych wyników:', err);
    res.status(500).json({ error: 'Błąd pobierania wyników wszystkich użytkowników' });
  }
});
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz nie znaleziony' });
    await quiz.deleteOne();
    res.json({ message: 'Quiz usunięty' });
  } catch (err) {
    res.status(500).json({ error: 'Błąd usuwania quizu' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('author', 'username');
    if (!quiz) return res.status(404).json({ error: 'Quiz nie znaleziony' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: 'Błąd pobierania quizu' });
  }
});

module.exports = router;