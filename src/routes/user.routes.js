import {Router} from "express";
import { loginUser,logoutUser,registerUser,refreshAccessToken } from "../controllers/user.controller.js";
import { upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()
//array cannot be used with multer as it takes multiple files in single field

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount : 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }

    ]),

    
    registerUser
)
router.route("/login").post(loginUser)

//some routes which need to be given when user is logged in 
//secured routes

router.route("/logout").post(verifyJWT , logoutUser)

router.route("/refresh-token").post(refreshAccessToken)


export default router
