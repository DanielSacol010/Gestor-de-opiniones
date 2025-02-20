import { body } from "express-validator";
import { emailExists, usernameExists } from "../helpers/db-validators.js";
import { validateFields} from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { deleteFileOnError } from "./delete-file-on-error.js";


export const registerValidator = [
    body("username").notEmpty().withMessage("The name is required"),
    body("username").custom(usernameExists),
    body("email").notEmpty().withMessage("The email is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("email").custom(emailExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage(`Password must be at least 8 characters long, 
        and contain at least one lowercase letter, one uppercase letter, 
        one number and one special character`),
    validateFields,
    deleteFileOnError,
    handleErrors
]

export const loginValidator = [ 
    body("email").optional().isEmail().withMessage("Invalid email format"),
    body("username").optional().isString().withMessage("Invalid username format"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    validateFields,
    deleteFileOnError,
    handleErrors
]

export const updateProfileValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    body("username").optional().isString().withMessage("Invalid username format"),
    body("email").optional().isEmail().withMessage("Invalid email format"),
    body("email").custom(emailExists),
    validateFields,
    deleteFileOnError,
    handleErrors
]

export const updateProfilePictureValidator = [
    validateJWT,
    hasRoles("USER_ROLE", "ADMIN_ROLE"),
    validateFields,
    deleteFileOnError,
    handleErrors
]

export const updatePasswordValidator = [
    validateJWT,
    hasRoles("USER_ROLE", "ADMIN_ROLE"),
    body("oldPassword").notEmpty().withMessage("The old password is required"),
    body("newPassword").notEmpty().withMessage("The new password is required"),
    body("newPassword").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage(`Password must be at least 8 characters long, 
        and contain at least one lowercase letter, one uppercase letter, 
        one number and one special character`),
    validateFields,
    deleteFileOnError,
    handleErrors
]