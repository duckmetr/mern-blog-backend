import express from 'express'
import auth from '../middlewares/auth.js'
import { upload } from '../storage/index.js'

const router = express.Router()

router.post('/upload', auth, upload.single('image'), (req, res) => {
  res.json({ ok: true, url: `/uploads/${req.file.originalname}` })
})

export default router
