import Post from "../Models/Post.js";

export const getFeedPosts = async (req, res) => {
    try {
        const allPost = await Post.find()
        res.status(201).json(allPost)
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
}