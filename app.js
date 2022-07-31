import 'dotenv/config'
import './db/connect.js'
import express from 'express'
import cors from 'cors'
import { upload } from './storage/index.js'
import userRoutes from './routers/user.js'
import postRoutes from './routers/post.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use(userRoutes)
app.use(postRoutes)

// need add auth
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({ ok: true, url: `/uploads/${req.file.originalname}` })
})

app.get('/', (_, res) => res.status(200).send('hello gusi :D'))

app.listen(process.env.PORT, () => console.log('server launched..'))
