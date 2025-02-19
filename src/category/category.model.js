import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
    versionKey: false,
    timeStamps: true
}) 
    
export default mongoose.model("category", categorySchema);

