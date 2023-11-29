import Post from "../Models/Post.js";

export const getUserPosts = async (req, res) => {
    try {
        const userId = req.params.id
        const allPost = await Post.find({ userId })
        res.status(201).json(allPost)
    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }
}