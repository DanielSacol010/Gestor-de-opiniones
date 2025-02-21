import Post from "./post.model.js"


export const createPost = async (req, res) => {
    try {
        const { usuario } = req
        const data = req.body
      
        const post = await Post.create({...data, user: usuario._id})
        return res.status(200).json({
            message: "Post has been created",
            post
        });
    } catch (err) {
        return res.status(500).json({
            message: "Post creation failed",
            error: err.message
        });
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        const { usuario } = req
        const data = req.body

        const post = await Post.findById(id)

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        if (!post.status) {
            return res.status(403).json({
                message: "Cannot edit a deleted post",
            });
        }

        if (post.user.toString() !== usuario._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to edit this post",
            });
        }

        const updatedPost = await Post.findByIdAndUpdate(id,{ ...data, user: usuario._id },{ new: true })

        return res.status(200).json({
            message: "Post has been updated",
            post: updatedPost
        });
    } catch (err) {
        return res.status(500).json({
            message: "Post update failed",
            error: err.message
        });
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        const { usuario } = req

        const post = await Post.findById(id)

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }
        if (post.user.toString() !== usuario._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to delete this post",
            });
        }
        
        const postDeleted = await Post.findByIdAndUpdate(id, { status: false }, { new: true })

        return res.status(200).json({
            message: "Post has been deleted",
            post: postDeleted
        });

    } catch (err) {
        return res.status(500).json({
            message: "Post deletion failed",
            error: err.message
        });
    }
}
