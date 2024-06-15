// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js"


// import mongoose from "mongoose";

// import {DB_NAME} from "./constants";

dotenv.config({
    path: './env'
})




connectDB()






