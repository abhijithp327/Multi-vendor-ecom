import slugify from "slugify";
import { Category } from "../models/categoryModel.js";


// @desc Create new Category
// @route /api/category/create-Category
// @access Private
export const createCategory = async (req, res) => {
    try {
        const categoryData = req.body;
        // Check if the vendor already exists
        const existingCategory = await Category.findOne({ name: categoryData.name });

        if (existingCategory) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Category with this Category name already exists",
                data: existingCategory
            });
        };
        // Generate slug for the store name
        const slug = slugify(categoryData.name, { lower: true });
        // Add the slug to the Category data
        categoryData.slug = slug;
        const newCategory = await Category.create(categoryData);
        res.status(201).json({
            status: 201,
            success: true,
            message: "Category created successfully",
            data: newCategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error creating Category",
            error: error
        });
    }
};


// @desc Get all Category
// @route /api/category/get-all-Categorys
// @access Public
export const getAllCategory = async (req, res) => {
    try {
        const subcategories = await Category.find();
        res.status(201).json({
            status: 201,
            success: true,
            message: "Categorys fetched successfully",
            data: subcategories
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error fetching subcategories",
            error: error
        });
    }
};

// @desc Get a category by slug
// @route /api/category/get-Category-by-slug/:slug
// @access Public
export const getCategoryBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await Category.findOne({ slug });
        res.status(201).json({
            status: 201,
            success: true,
            message: "Category fetched successfully",
            data: category
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error fetching Category",
            error: error
        });
    }
};

// @desc Update Category
// @route /api/Category/update-Category/:id
// @access Private
export const updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
       
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, {
            new: true
        });
        if (!updatedCategory) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Category not found"
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Category updated successfully",
            data: updatedCategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error updating Category",
            error: error
        });
    }
};


// @desc Delete Category
// @route /api/Category/delete-Category/:CategoryId
// @access Private
export const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Category not found"
            });
        };
        res.status(200).json({
            status: 200,
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error deleting Category",
            error: error
        });
    }
};