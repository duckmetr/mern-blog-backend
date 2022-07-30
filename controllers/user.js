import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user.js'

export async function login(req, res) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ ok: false, message: 'Користувач не знайдений' })
    }

    const isValidPass = await bcrypt.compare(password, user.passwordHash)
    if (!isValidPass) {
      return res.status(403).json({ ok: false, message: 'Логін або пароль невірний' })
    }

    const token = jwt.sign({ _id: user._id }, 'secretkey', { expiresIn: '30d' })
    const {
      __v,
      _id,
      passwordHash: { hash },
      createdAt,
      updatedAt,
      ...userData
    } = user._doc

    res.status(200).json({ ok: true, data: { ...userData, token } })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server Error' })
  }
}

export async function register(req, res) {
  try {
    const { email, password, fullName, avatarUrl } = req.body
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(String(password), salt)
    const user = await User.create({ email, fullName, avatarUrl, passwordHash })
    const token = jwt.sign({ _id: user._id }, 'secretkey', { expiresIn: '30d' })
    const {
      __v,
      _id,
      passwordHash: { hash },
      createdAt,
      updatedAt,
      ...userData
    } = user._doc

    res.status(201).json({ ok: true, data: { ...userData, token } })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server Error' })
  }
}

export async function profile(req, res) {
  try {
    const user = await User.findById({ _id: req.id })
    const { __v, _id, passwordHash, createdAt, updatedAt, ...userData } = user._doc
    res.status(200).json({ ok: true, data: { id: _id, ...userData } })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server Error' })
  }
}
