import Post from "../Models/Post.js";
import User from "../Models/User.js";

export const likePost = async (req, res) => {
    try {
        const { id } = req.params
        const { userId } = req.body

        const post = await Post.findById(id)
        const isLiked = post.likes.get(userId)

        if (isLiked) {
            post.likes.delete(userId)
        }
        else {
            post.likes.set(userId, true)
        }

        const updatedPost = await Post.findByIdAndUpdate(id, {
            likes: post.likes
        }, { new: true })

        res.status(200).json(updatedPost)
    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }
}