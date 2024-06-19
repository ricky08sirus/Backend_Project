import { asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.Model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler( async(req,res) => {
    // return res.status(200).json({
    //     message: "Hello"
    // })
    
    //get user details from backend
    //validation - not empty
    //check if user already exists : username, email
    //check for images, check for avatar
    //upload them to cloudinary, avatar
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return res

    //get user details from backend
    const {fullName, email, username, password}=req.body
    console.log("email",email);

     //validation - not empty

    if (
        [fullName, email, username , password].some((field)=>field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
        
        
    }

    //check if user already exists : username, email
    const existedUser = User.findOne({
        //operators
        $or:[{username},{email}]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
        
    }
    //handling images
    //as we have added middle wares in routes
    //now we have access to other fields also multer has given us the access of req.files
    //we will take its first property [0] as we get one object there through which we will get its path
    //? this is a of optional decrypt as we are not sure we will get or not



    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalpath = req.file?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400,"Avatar file is required")

        
    }

    // to upload on cloudinary

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalpath)

    //check if avatar is available



    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
        
    }
    // create a user and upload data to database


    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()

    })
    //if user is created then mongodb automatically adds one field _id 
    // so if it finds the user it means the user is there otherwise its not there
    const createdUser = await User.findById(usre._id).select(
        "-password -refreshToken" //negative sign means we dont want this
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")

        
    }
    //to send the response in a organised way we will use Apiresponse class prepared earlier

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
        
    )




})

export {registerUser}
