import User from "../Models/User.js";

export const getUserData = async (req, res) => {
    try {
        const userId = req.params.id
        const userData = await User.findById(userId)
        res.status(200).json(userData)
    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }
}