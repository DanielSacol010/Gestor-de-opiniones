import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        minLength: [8, 'Password must be 8 characters'],
        required: [true, "Password is required"]
    },
    profilePicture: {
        type: String
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"],
        default: "USER_ROLE"
    }
}, {
    versionKey: false,
    timeStamps: true
})

userSchema.methods.toJSON = function(){
    const {password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}



export default mongoose.model('user', userSchema)