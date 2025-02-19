import { Router } from "express";
import { createCategory, getCategories, editCategory, deleteCategory } from "./category.controller.js";
import { createCategoryValidator, editCategoryValidator, deleteCategoryValidator, getCategoriesValidator } from "../middlewares/category-validators.js";
const router = Router();

router.post(
    "/createCategory",
    createCategoryValidator,
    createCategory
);

router.get(
    "/getCategories", 
    getCategoriesValidator, 
    getCategories
);

router.put(
    "/editCategory/:id", 
    editCategoryValidator, 
    editCategory
);

router.delete(
    "/deleteCategory/:id", 
    deleteCategoryValidator, 
    deleteCategory
);

export default router;
