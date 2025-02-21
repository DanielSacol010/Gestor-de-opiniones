import { Schema, model } from "mongoose";

const commentSchema = Schema({
    content: {
        type: String,
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "post",
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
})

export default model("comment", commentSchema)