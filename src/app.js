import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import 

import userRouter from './routes/user.routes.js'

//routes declaration

//app.get was working because we were writing all routes and their call in the same file now as the routers are in different place so now we will use middleware to bring router

app.use("/api/v1/users", userRouter)

// http://localhost:8000/api/v1/users/register
export {app}