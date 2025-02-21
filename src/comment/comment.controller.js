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
