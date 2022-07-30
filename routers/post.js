import express from 'express'
import auth from '../middlewares/auth.js'
import handleValidationErrors from '../middlewares/validator.js'
import * as PostController from '../controllers/post.js'
import { postCreateValidation } from '../validation/post.js'

const router = express.Router()

router.post('/posts', auth, postCreateValidation, handleValidationErrors, PostController.create)
router.get('/posts', PostController.getAll)
router.get('/posts/:id', PostController.getOne)
router.patch(
  '/posts/:id',
  auth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update,
)
router.delete('/posts/:id', auth, PostController.remove)

export default router
