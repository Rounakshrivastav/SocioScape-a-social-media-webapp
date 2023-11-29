import express from "express"
import { getFeedPosts } from "../Controllers/GetFeed.js"
import { getUserPosts } from "../Controllers/GetUserPosts.js"
import { likePost } from "../Controllers/LikePost.js"
import { addComment } from "../Controllers/AddComment.js"
import { verifyToken } from "../Middleware/Auth.js"

const router = express.Router()

router.get("/", verifyToken, getFeedPosts)
router.get("/:id",verifyToken, getUserPosts)
router.patch("/:id/like", verifyToken, likePost)
router.patch("/:id/addcomment", verifyToken, addComment)

export default router