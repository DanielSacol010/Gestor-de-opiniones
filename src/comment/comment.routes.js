import { Router } from "express";
import { createCommentValidator, updateCommentValidator,deleteCommentValidator } from "../middlewares/comment-validators.js";
import { createComment, updateComment, deleteComment } from "./comment.controller.js";

const router = Router()

/**
 * @swagger
 * /createComment:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The comment's content
 *                 example: This is a comment.
 *               postId:
 *                 type: string
 *                 description: The ID of the post the comment belongs to
 *                 example: 60d0fe4f5311236168a109ca
 *               user:
 *                 type: string
 *                 description: The ID of the user creating the comment
 *                 example: 60d0fe4f5311236168a109cb
 *     responses:
 *       201:
 *         description: Comment has been created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment has been created
 *                 comment:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                       example: This is a comment.
 *                     postId:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     user:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109cb
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid input
 *                 error:
 *                   type: string
 *                   example: Content is required
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @swagger
 * /updateComment/{id}:
 *   patch:
 *     summary: Update an existing comment
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The comment's content
 *                 example: This is an updated comment.
 *     responses:
 *       200:
 *         description: Comment has been updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment has been updated
 *                 comment:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                       example: This is an updated comment.
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid input
 *                 error:
 *                   type: string
 *                   example: Content is required
 *       404:
 *         description: Comment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @swagger
 * /deleteComment/{id}:
 *   delete:
 *     summary: Delete an existing comment
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment has been deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment has been deleted
 *       404:
 *         description: Comment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

router.post("/createComment", createCommentValidator, createComment)

router.patch("/updateComment/:id", updateCommentValidator, updateComment)

router.delete("/deleteComment/:id", deleteCommentValidator, deleteComment)

export default router
