import express, {Request, Response} from "express"
import cors from "cors"
import "dotenv/config"
import cookierParser from "cookie-parser"
import mongoose from "mongoose"
import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"
import adminRoute from "./routes/admin"
import generalRoute from "./routes/general"
import commonRoute from "./routes/common"
import addressRoute from "./routes/address"
import StripeRoute from "./routes/stripe"
import {v2 as cloudinary} from 'cloudinary';





cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});
mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)

const app = express()
app.use(cookierParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET","POST","PUT", "PATCH","DELETE","OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Credentials"
    ]
}))

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoute)
app.use("/api/general", generalRoute)
app.use("/api/common", commonRoute)
app.use("/api/addresses", addressRoute)
app.use("/api/stripe", StripeRoute )


app.listen(7000, ()=>{
    console.log("Server running on localhost:7000")
})
