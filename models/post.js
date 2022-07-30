import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    viewsCount: { type: Number, defaul: 0 },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  },
)

const Post = mongoose.model('posts', postSchema)

export default Post
