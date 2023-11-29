import Post from "../Models/Post.js";
import User from "../Models/User.js";

export const createPost = async (req, res) => {
    try {

        const { userId, description, picturePath } = req.body
        const userData = await User.findById(userId)

        console.log(userId, description, picturePath)

        const newPost = new Post({
            userId,
            firstName : userData.firstName,
            lastName : userData.lastName,
            location: userData.location,
            description,
            userPicturePath: userData.picturePath,
            picturePath,
            likes: {} ,
            comments: []
        })

        await newPost.save()
        const allPost = await Post.find()
        res.status(201).json(allPost)

    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }
}

