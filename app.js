import express from 'express'
import cors from 'cors'
import { userRoutes, postRoutes, uploadRoutes } from './routers/index.js'
import './db/connect.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.use(userRoutes)
app.use(postRoutes)
app.use(uploadRoutes)

app.get('/', (_, res) => res.status(200).send('hello gusi :D'))

app.listen(process.env.PORT, () => console.log('server launched..'))
