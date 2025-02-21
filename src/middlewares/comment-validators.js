import { postExists, postIsActive } from "../helpers/db-validators.js"
import { body, param } from "express-validator";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createCommentValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    body("content").notEmpty().withMessage("The content is required"),
    body("postId").notEmpty().isMongoId().withMessage("Invalid post id"),  
    body("postId").custom(postExists),
    body("postId").custom(postIsActive),
    validateFields,
    handleErrors
]
