import { Router } from "express";
import { createCommentValidator } from "../middlewares/comment-validators.js";
import { createComment } from "./comment.controller.js";

const router = Router()

router.post("/createComment", createCommentValidator, createComment)

export default router
