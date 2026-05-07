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
        }
    },
     {
            timestamps: true
        }
)

export default mongoose.models.Msg || mongoose.model('Msg',msgSchema);