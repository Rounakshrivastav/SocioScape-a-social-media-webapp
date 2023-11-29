import dotenv from "dotenv"
dotenv.config()
import bodyParser from "body-parser"
import { fileURLToPath } from "url"
import express, { Router } from "express"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import path from "path"


import "./connection.js"
const PORT = process.env.PORT || 5000
import { register } from "./Controllers/Registeration.js"
import { login } from "./Controllers/Login.js"
import { createPost } from "./Controllers/createPost.js"
import userRoutes from "./Routes/userRoutes.js"
import postRoutes from "./Routes/postRoutes.js"
import { verifyToken } from "./Middleware/Auth.js"


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()


app.use("/assets", express.static(path.join(__dirname, "public/assets")))
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(morgan("common"))
app.use(express.json())
app.use(helmet())
app.use(cors())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })


app.post("/api/register", register)
app.post("/api/posts", createPost)
app.post("/api/login", login)
app.use("/api/posts", postRoutes)
app.use("/api", userRoutes)


app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})