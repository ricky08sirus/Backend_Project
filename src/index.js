// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js"


// import mongoose from "mongoose";

// import {DB_NAME} from "./constants";

dotenv.config({
    path: './env'
})




connectDB()
//after connection it will listen the database

.then(() => {
    app.listen(process.env.PORT || 8000,() => {
        console.log(`server is running on port : ${process.env.PORT}`)

    })

    app.on("error",(error) =>{
        console.log("ERRR" , error);
        throw error
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!",err);


})






