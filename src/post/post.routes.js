import { Router } from "express";
import { createPostValidator, updatePostValidator, deletePostValidator } from "../middlewares/post-validators.js";
import { createPost, updatePost, deletePost } from "./post.controller.js";

const router = Router()

router.post("/createPost", createPostValidator, createPost)

router.put("/updatePost/:id", updatePostValidator, updatePost)

router.delete("/deletePost/:id", deletePostValidator, deletePost)

export default router
