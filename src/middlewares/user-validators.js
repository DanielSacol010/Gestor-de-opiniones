import { body } from "express-validator";
import { emailExists, usernameExists } from "../helpers/db-validators.js";
import { validateFields} from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";


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
    handleErrors
]

export const loginValidator = [ 
    body("email").optional().isEmail().withMessage("Invalid email format"),
    body("username").optional().isString().withMessage("Invalid username format"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    validateFields,
    handleErrors
]