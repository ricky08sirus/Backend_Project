import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router()
//array cannot be used with multer as it takes multiple files in single field

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxcount : 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }

    ]),
    registerUser
)


export default router
