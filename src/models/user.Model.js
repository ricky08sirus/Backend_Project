import mongoose , {Schema} from "mongoose"

import jwt from "jsonwebtoken"

import bcrypt from "bcrypt" //direct encryption is not possible so we take help of some hooks


const userSchema = new Schema({
    username:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true   // to enable the searching field enable it to true


    },
    email:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,

    },
    fullName:{
        type: String,
        required: true,
        unique:true,
        index:true,
        trim: true,

    },
    avatar:{
        type:String, // url
        required: true,

    },
    coverImage:{
        type: String, // URL
        required:true,

    },
    coverImage: {
        type: String,
        required: true,

    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "Video",
        }

    ],

    password:{
        type: String,
        required: [true, 'password is required']

    },

    refreshtoken :{
        type: String,

    },


},{
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next() //give the next flag to let it to the next step as it is a middleware

})

userSchema.methods.isPasswordCorrect = async function(password){
    //bcrypt can check your password
    return await bcrypt.compare(password, this.password)
} 

userSchema.methods.generateAccessToken = function(){//these things are already there in database and have access to this......
  return  jwt.sign({
        _id:this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshToken = function(){
    return  jwt.sign({
        _id:this._id,
        

        // email: this.email,
        // username: this.username,
        // fullName: this.fullName
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User",userSchema)