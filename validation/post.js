import { body } from 'express-validator'

export const postCreateValidation = [
  body('title', 'Уведіть заголовок статті').isLength({ min: 3 }).isString(),
  body('text', 'Уведіть текст статті').isLength({ min: 10 }).isString(),
  body('tags', 'Невірний формат тегів').optional().isArray(),
  body('imageUrl', 'Невірне посилання на зображення').optional().isString(),
]
