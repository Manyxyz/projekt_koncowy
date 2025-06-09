const express = require('express');
const { register, login } = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../validators/authValidator');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerValidator, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  register(req, res, next);
});

router.post('/login', loginValidator, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  login(req, res, next);
});

router.put('/username', authMiddleware, async (req, res) => {
  try {
    const { userId, newUsername } = req.body;
    if (!userId || !newUsername) return res.status(400).json({ error: 'Brak danych' });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
    user.username = newUsername;
    await user.save();
    res.json({ message: 'Nazwa użytkownika zmieniona', username: user.username });
  } catch (err) {
    res.status(500).json({ error: 'Błąd zmiany nazwy użytkownika' });
  }
});

router.put('/password', authMiddleware, async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;
    if (!userId || !oldPassword || !newPassword) return res.status(400).json({ error: 'Brak danych' });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Stare hasło nieprawidłowe' });
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Hasło zmienione' });
  } catch (err) {
    res.status(500).json({ error: 'Błąd zmiany hasła' });
  }
});

router.delete('/delete', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'Brak danych' });
    await User.findByIdAndDelete(userId);
    res.json({ message: 'Konto usunięte' });
  } catch (err) {
    res.status(500).json({ error: 'Błąd usuwania konta' });
  }
});


module.exports = router;
