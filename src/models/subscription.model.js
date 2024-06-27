import mongoose, {Schema, Types} from "mongoose"

const subscriptionSchema = new Schema({
    subscriber:{
        types: Schema.Types.ObjectId,       //person who is subscribing

        ref:"User"
    },
    channel:{
        type: Schema.Types.ObjectId ,
        ref: "User"

    },





},{
    timestamps: true
})



export const Subscription = mongoose.model("Subscription",subscriptionSchema)