import Post from "../Models/Post.js";

export const addComment = async (req, res) => {
    try {
        const { id } = req.params

        const post = await Post.findById(id)
        post.comments.push(req.body.commentData)

        const updatedPost = await Post.findByIdAndUpdate(id, {
            comments: post.comments
        }, { new: true })

        res.status(200).json(updatedPost)
    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }
}