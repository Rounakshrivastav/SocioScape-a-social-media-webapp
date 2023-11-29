import express from "express"
import { getUserData } from "../Controllers/GetUser.js"
import { getUserFriends } from "../Controllers/GetUserFriends.js"
import { AddRemoveFriends } from "../Controllers/AddRemoveFriends.js"
import { verifyToken } from "../Middleware/Auth.js"

const router = express.Router()

router.get("/:id",verifyToken, getUserData)
router.get("/:id/friends",verifyToken, getUserFriends)
router.patch("/:id/:friendId", AddRemoveFriends)

export default router