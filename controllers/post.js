import Post from '../models/post.js'

export async function create(req, res) {
  try {
    const { title, text, imageUrl, tags } = req.body
    const post = await Post.create({ title, text, imageUrl, tags, user: req.id })

    res.status(201).json({ ok: true, data: { post } })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server Error' })
  }
}

export async function getAll(req, res) {
  try {
    const posts = await Post.find({})

    res.status(200).json({ ok: true, data: { posts } })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server Error' })
  }
}

export async function getOne(req, res) {
  try {
    const postId = req.params.id
    const post = await Post.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' },
    )
    if (!post) {
      return res.status(404).json({ ok: false, message: 'Не знайдено' })
    }

    res.status(200).json({ ok: true, data: { post } })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server Error' })
  }
}

export const update = async (req, res) => {
  try {
    const postId = req.params.id
    const { title, text, imageUrl, tags } = req.body
    await Post.updateOne({ _id: postId }, { title, text, imageUrl, tags, user: req.id })

    res.json({ ok: true })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server Error' })
  }
}

export async function remove(req, res) {
  try {
    const postId = req.params.id
    const post = await Post.findOneAndDelete({ _id: postId })
    if (!post) {
      return res.status(404).json({ ok: false, message: 'Не знайдено' })
    }

    res.status(200).json({ ok: true })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server Error' })
  }
}
