import Comment from "./comment.model.js";

export const createComment = async (req, res) => {
    try {
        const { usuario } = req
        const data = req.body

        const comment = await Comment.create({...data, user: usuario._id})
        return res.status(200).json({
            message: "Comment has been created",
            comment
        });
    } catch (err) {
        return res.status(500).json({
            message: "Comment creation failed",
            error: err.message
        });
    }
}

export const updateComment = async (req, res) => {
    try {
        const { id } = req.params
        const { usuario } = req
        const { content } = req.body

        const comment = await Comment.findById(id)

        if(!comment){
            return res.status(404).json({
                message: "Comment not found",
            });
        }

        if(comment.user.toString() !== usuario._id.toString()){
            return res.status(403).json({
                message: "You are not authorized to edit this comment",
            });
        }

        const updatedComment = await Comment.findByIdAndUpdate(id, { content, user: usuario._id }, { new: true })

        return res.status(200).json({
            message: "Post has been updated",
            comment: updatedComment
        });
    } catch (err) {
        return res.status(500).json({
            message: "Post update failed",
            error: err.message
        });
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params
        const { usuario } = req

        const comment = await Comment.findById(id)

        if(!comment){
            return res.status(404).json({
                message: "Comment not found",
            });
        }

        if(comment.user.toString() !== usuario._id.toString()){
            return res.status(403).json({
                message: "You are not authorized to delete this comment",
            });
        }

        const commentDeleted = await Comment.findByIdAndUpdate(id, { status: false }, { new: true })
        return res.status(200).json({
            succes: false,
            message: "Post has been updated",
            comment: commentDeleted
        });
    } catch (err) {
        return res.status(500).json({
            succes: false,
            message: "Post update failed",
            error: err.message
        });
    }
}