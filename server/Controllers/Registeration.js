import bcrypt from "bcrypt"
import User from "../Models/User.js";

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            location,
            occupation
        } = req.body


        console.log(firstName,
            lastName,
            email,
            picturePath,
            password,
            location,
            occupation)

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            picturePath: req.body.picturePath,
            location: req.body.location,
            occupation: req.body.occupation,
            views : Math.floor(Math.random()*10000),
            impressions : Math.floor(Math.random()*10000)
        })

        await newUser.save()
        res.status(201).json(saveUser)
    }
    catch (err) {
        res.status(404).json({ error: err })
    }
}