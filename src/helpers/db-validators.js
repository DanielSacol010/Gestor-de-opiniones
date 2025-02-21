import User from "../user/user.model.js"
import Category from "../category/category.model.js"
import Post from "../post/post.model.js"
import Comment from "../comment/comment.model.js"
export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("User not found")
    }
}

export const categoryExists = async (id = "") => {
    const existe = await Category.findById(id)
    if(!existe){
        throw new Error("Category not found")
    }
}

export const postExists = async (id = "") => {
    const existe = await Post.findById(id)
    if(!existe){
        throw new Error("Post not found")
    }
}

export const postIsActive = async (id = "") => {
    const existe = await Post.findById(id)
    if(!existe){
        throw new Error("Post not found")
    }
    if(existe.status === false){
        throw new Error("The post is deleted")
    }
}

export const commentIsActive = async(id = " ") => {
    const existe = await Comment.findById(id)
    if (!existe) {
        throw new Error("Comment not found")
    }
    if(existe.status === false){
        throw new Error("The comment is deleted")
    }
}

