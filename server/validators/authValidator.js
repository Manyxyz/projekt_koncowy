const { body } = require('express-validator');

const registerValidator = [
  body('username').isLength({ min: 3 }).withMessage('Nazwa użytkownika min. 3 znaki'),
  body('email').isEmail().withMessage('Nieprawidłowy email'),
  body('password').isLength({ min: 6 }).withMessage('Hasło min. 6 znaków'),
];

const loginValidator = [
  body('email').isEmail(),
  body('password').notEmpty().withMessage('Hasło jest wymagane'),
];

module.exports = { registerValidator, loginValidator };
