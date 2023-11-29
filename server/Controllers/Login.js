import mongoose from "mongoose";
import bcrypt from "bcrypt"
import User from "../Models/User.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const userData = await User.findOne({email : email})

        if(!userData){
            return res.status(400).json({message : "User does'nt exist"})
        }
        else{
            const isPassMatched = await bcrypt.compare(password, userData.password)

            if(isPassMatched){
                const token = jwt.sign({id: userData._id}, process.env.SECRET_KEY)
                delete userData.password
                return res.status(200).json({token:token, data:userData})
            }
            else{
                return res.status(400).json({message : "Invalid Credentials"})
            }
        }

    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }
}