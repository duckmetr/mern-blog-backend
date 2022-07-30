import { body } from 'express-validator'

export const loginValidation = [
  body('email', 'Невірний формат пошти').isEmail(),
  body('password', 'Пароль повинен бути мінімум 6 символів').isLength({ min: 6, max: 100 }),
]

export const registerValidation = [
  body('email', 'Невірний формат пошти').isEmail(),
  body('password', 'Пароль повинен бути мінімум 6 символів').isLength({ min: 6, max: 100 }),
  body('fullName', "Укажіть ім'я").isLength({ min: 3, max: 100 }),
  body('avatarUrl', 'Невірне посилання на зображення').optional().isURL(),
]
