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
    }]
}) 


export default mongoose.models.User || mongoose.model("User", userSchema); 