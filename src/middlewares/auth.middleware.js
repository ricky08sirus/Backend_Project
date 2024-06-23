import { asyncHandler } from "../utils/asyncHandler";

//while writing middleware we always write next

export const verifyJWT = asyncHandler(async(req,res,next) =>{
    req.cookies?.accessToken || req.header("Authorization")?


})