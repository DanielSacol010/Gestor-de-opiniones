import { body, param } from "express-validator";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("The name is required"),
    body("description").notEmpty().withMessage("The description is required"),
    validateFields,
    handleErrors
]

export const getCategoriesValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validateFields,
    handleErrors
]

export const editCategoryValidator = [  
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("Invalid category id"),
    validateFields,
    handleErrors
]

export const deleteCategoryValidator = [                    
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("Invalid category id"),
    validateFields,
    handleErrors
]
