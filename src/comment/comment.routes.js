import { Router } from "express";
import { createCommentValidator, updateCommentValidator,deleteCommentValidator } from "../middlewares/comment-validators.js";
import { createComment, updateComment, deleteComment } from "./comment.controller.js";

const router = Router()

router.post("/createComment", createCommentValidator, createComment)

router.patch("/updateComment/:id", updateCommentValidator, updateComment)

router.delete("/deleteComment/:id", deleteCommentValidator, deleteComment)

export default router
