import { asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async(userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        //Save the refresh Token in database so that we dont have to ask for password again and again


        user.refreshToken = refreshToken
        await user.save({validateBeforeSave : false})

        return {accessToken, refreshToken}
        
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating refresh token")
        
    }
}


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
    //if the request is coming from form we will get that from req.body


    //get user details from backend
    const {fullName, email, username, password}=req.body
    // console.log("email",email);

     //validation - not empty
     //some return true or false


    if (
        [fullName, email, username , password].some((field)=>field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
        
        
    }

    //check if user already exists : username, email
    const existedUser = await User.findOne({
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
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400,"Avatar file is required")

        
    }

    // to upload on cloudinary

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

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
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" //negative sign means we dont want this
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")

        
    }
    //to send the response in a organised way we will use Apiresponse class prepared earlier

    return  res.status(201).json(
        new  ApiResponse(200,createdUser,"User registered successfully")
        
    )




})

const loginUser = asyncHandler(async (req,res) => {
    //req body -> data
    //username or email
    //find the user
    //password check
    //access and refresh token 
    //send cookie

    const {email,username, password} = req.body // fields we require while logging in the user
    //as we have used cooki parser we can use cookie middleware  with req and res method 
    if (!username || !email) {
        throw new ApiError(400,"username or email is required")

        
    }
    const user = await User.findOne({
        $or: [{username},{email}]
    })
    if (!user) {
        throw new ApiError(404, "User does not exist")

        
    }
    //now check if the user has given the correct password or not 

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401,"Invalid user credentials")

    }
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser =  await User.findById(user._id).select("-password  -refreshToken")
    //this cookie is only modifiable by the server

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken", accessToken,options)
    .cookie("refreshToken")
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken,refreshToken
                //if user want to store these token on its local server

            },
            "User logged in succesfully"
        )
    )



    

})

const logoutUser = asyncHandler(async(req,res) =>{
    //first remove the cookie as it is managed by the server

})

export {
    registerUser,
    loginUser
}
