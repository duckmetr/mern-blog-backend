import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  try {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if (!token) {
      return res.status(403).json({ ok: false, message: 'Доступ заборонено1' })
    }

    const decoded = jwt.verify(token, 'secretkey')
    req.id = decoded._id
    next()
  } catch (error) {
    console.log(error)
    return res.status(403).json({ ok: false, message: 'Доступ заборонено2' })
  }
}

export default auth
