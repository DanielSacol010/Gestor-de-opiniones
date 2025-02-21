import { body, param } from "express-validator";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { categoryExists } from "../helpers/db-validators.js";
export const createPostValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('categoryId').notEmpty().withMessage('Category is required'),
    body('categoryId').isMongoId().withMessage('Invalid category ID'),
    body('categoryId').custom(categoryExists),
    validateFields,
    handleErrors
]

export const updatePostValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param('id').isMongoId().withMessage('Invalid post ID'),
    body('title').optional(),
    body('content').optional(),
    body('categoryId').optional().isMongoId().withMessage('Invalid category ID'),
    validateFields,
    handleErrors
]

export const deletePostValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param('id').isMongoId().withMessage('Invalid post ID'),
    validateFields,
    handleErrors
]

