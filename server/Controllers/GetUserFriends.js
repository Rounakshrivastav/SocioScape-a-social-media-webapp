import User from "../Models/User.js";

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params
        const userData = await User.findById(id)

        const friends = await Promise.all(userData.friends.map((id) => User.findById(id)))

        const formattedFriends = friends.map(({
            _id, firstName, lastName, occupation, location, picturePath
        }) => {
            return { _id, firstName, lastName, occupation, location, picturePath }
        })

        res.status(200).json(formattedFriends)
    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }
}