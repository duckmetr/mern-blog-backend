import express from 'express'
import { loginValidation, registerValidation } from '../validation/auth.js'
import auth from '../middlewares/auth.js'
import handleValidationErrors from '../middlewares/validator.js'
import * as UserController from '../controllers/user.js'

const router = express.Router()

router.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
router.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)
router.get('/auth/profile', auth, UserController.profile)

export default router
