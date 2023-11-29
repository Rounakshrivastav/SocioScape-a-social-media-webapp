import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"

const DBconnection = async () => {

    await mongoose.connect(process.env.MONGODB_URL, {

        useNewUrlParser: "true",
        useUnifiedTopology: "true"

    }).then(() => {
        console.log("Connected to database")
    }).catch((err) => {
        console.log(err)
    })
}

DBconnection()