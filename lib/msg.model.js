import mongoose from "mongoose";

const msgSchema = new mongoose.Schema(
    {
        senderId :{
            type: mongoose.Types.ObjectId,
            ref: 'Users'
        },
        receiId :{
            type: mongoose.Types.ObjectId,
            ref: 'Users'
        },
        message : {
            type:String
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    }
)

export default mongoose.models.msg || mongoose.model('msg',msgSchema);