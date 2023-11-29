import jwt from "jsonwebtoken"

export const verifyToken = async (req,res,next) => {
    try{
        let token = req.header("Authorization")
        if(!token){
            res.status(402).json({ message: "Access Denied" })
        }

        if(token.startsWith("Bearer ")){
            token = token.slice(7,token.length)
        }

        const verified = jwt.verify(token, process.env.SECRET_KEY)
        req.user = verified
        next()
    }
    catch(err){
        console.log(err)
        res.status(500).json({ error: err.message })
    }
}