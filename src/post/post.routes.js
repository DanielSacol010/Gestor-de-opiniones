import { Router } from "express";
import { createPostValidator, updatePostValidator, deletePostValidator } from "../middlewares/post-validators.js";
import { createPost, updatePost, deletePost } from "./post.controller.js";

const router = Router()

/**
 * @swagger
 * /createPost:
 *   post:
 *     summary: Create a new post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The post's title
 *                 example: My First Post
 *               content:
 *                 type: string
 *                 description: The post's content
 *                 example: This is the content of my first post.
 *               categoryId:
 *                 type: string
 *                 description: The ID of the category for the post
 *                 example: 60d0fe4f5311236168a109cb
 *     responses:
 *       201:
 *         description: Post has been created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post has been created
 *                 post:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: My First Post
 *                     content:
 *                       type: string
 *                       example: This is the content of my first post.
 *                     user:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     categoryId:
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
 *                   example: Title is required
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No token provided in the request
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
 * /updatePost/{id}:
 *   put:
 *     summary: Update an existing post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The post's title
 *                 example: Updated Post Title
 *               content:
 *                 type: string
 *                 description: The post's content
 *                 example: This is the updated content of the post.
 *     responses:
 *       200:
 *         description: Post has been updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post has been updated
 *                 post:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: Updated Post Title
 *                     content:
 *                       type: string
 *                       example: This is the updated content of the post.
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
 *                   example: Title is required
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No token provided in the request
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You are not authorized to edit this post
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post not found
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
 * /deletePost/{id}:
 *   delete:
 *     summary: Delete an existing post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to delete
 *     responses:
 *       200:
 *         description: Post has been deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post has been deleted
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No token provided in the request
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You are not authorized to delete this post
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post not found
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

router.post("/createPost", createPostValidator, createPost)

router.put("/updatePost/:id", updatePostValidator, updatePost)

router.delete("/deletePost/:id", deletePostValidator, deletePost)

export default router
