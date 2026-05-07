import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password :{
        type:String
    },
    contact :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    }],
    notifi :[{
        type:String
    }],
    messages: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:'Msg'
        }
    ],
    request :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    sendReq : [
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
    ]
}) 


export default mongoose.models.User || mongoose.model("User", userSchema); 