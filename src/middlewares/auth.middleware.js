import { asyncHandler } from "../utils/asyncHandler";
import {ApiError} from "../utils/ApiError"
import jwt from "jsonwebtoken"
import {User} from "../models/user.models"
// import { json } from "express";

//while writing middleware we always write next
//as res is not getting used so we can use underscore
// export const verifyJWT = asyncHandler(async(req,res,next)
export const verifyJWT = asyncHandler(async(req,_,next) =>{
   try {
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer" , "")
     //check if token is not given
 
 
     if (!token) {
         throw new ApiError(401, "Unauthorized request")
 
         
     }
     const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
 
     const user = await User.findById(decodedToken?._id).select(" -password -refreshToken")
     
     if (!user) {
         throw new ApiError(401,"Invalid Access Token")
 
         
     }
 
     req.user = user;
     next()
   } 
   catch (error) {
    throw new ApiError(401,"Unauthorized request")


    
   }







})