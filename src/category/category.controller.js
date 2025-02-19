import Category from "./category.model.js";

export const initializeDefaultCategories = async () => {
    try {
        const predefinedCategories = [
            { name: "Default", description: "Default category" },
            { name: "Tecnologia", description: "todo sobre tecnologia" },
            { name: "Salud", description: "todo sobre salud" },
            { name: "Educacion", description: "todo sobre educacion" },
            { name: "Entretenimiento", description: "todo sobre entretenimiento" }
        ];

        for (const categoryData of predefinedCategories) {
            const categoryExists = await Category.findOne({ name: categoryData.name });
            if (!categoryExists) {
                const category = new Category(categoryData);
                await category.save();
                console.log(`Category '${categoryData.name}' created successfully`);
            }
        }
    } catch (err) {
        console.log("Error initializing default categories", err);
    }
};

initializeDefaultCategories();

export const createCategory = async (req, res) => {
    try {
        const data  = req.body;
        const category = await Category.create(data);
        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Error creating category",
        });
    }
}

export const getCategories = async (req, res) => {
    try{
        const {limit = 10, desde = 0} = req.query;
        
        const [total, categories] = await Promise.all([
            Category.countDocuments(),
            Category.find()
            .skip(Number(desde))
            .limit(Number(limit))
        ])
        
        res.status(200).json({
            success: true,
            message: "Categories retrieved successfully",
            total,
            categories  
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error getting categories",
        });
    }
}

export const editCategory = async (req, res) => {
    try {
        const {id} = req.params;
        const data = req.body;
        const category = await Category.findByIdAndUpdate(id, data, {new: true});
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error updating category",
        });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const {id} = req.params;
        
        const deletedCategory = await Category.findById({_id: id});
        if(!deletedCategory){
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        const defaultCategory = await Category.findOne({name: "Default"});
        if(!defaultCategory){
            return res.status(404).json({
                success: false,
                message: "Default category not found",
            });
        }

        //await Post.updateMany({category: id}, {category: defaultCategory._id});

        
        await Category.findByIdAndUpdate(id, {status: false});

        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error deleting category",
        });
    }
}
