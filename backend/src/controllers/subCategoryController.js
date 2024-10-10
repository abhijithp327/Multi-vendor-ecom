import slugify from "slugify";
import { SubCategory } from "../models/subCategoryModel.js";


// @desc Create new SubCategory
// @route /api/subcategory/create-SubCategory
// @access Private
export const createSubCategory = async (req, res) => {
    try {
        const subcategoryData = req.body;
        // Check if the vendor already exists
        const existingSubCategory = await SubCategory.findOne({ name: subcategoryData.name });

        if (existingSubCategory) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "SubCategory with this SubCategory name already exists",
                data: existingSubCategory
            });
        };
        // Generate slug for the store name
        const slug = slugify(subcategoryData.name, { lower: true });
        // Add the slug to the SubCategory data
        subcategoryData.slug = slug;
        const newSubCategory = await SubCategory.create(subcategoryData);
        res.status(201).json({
            status: 201,
            success: true,
            message: "SubCategory created successfully",
            data: newSubCategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error creating SubCategory",
            error: error
        });
    }
};


// @desc Get all SubCategory
// @route /api/subcategory/get-all-SubCategorys
// @access Public
export const getAllSubCategory = async (req, res) => {
    try {
        const subcategories = await SubCategory.find();
        res.status(201).json({
            status: 201,
            success: true,
            message: "SubCategorys fetched successfully",
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

// @desc Get a subcategory by slug
// @route /api/subcategory/get-SubCategory-by-slug/:slug
// @access Public
export const getSubCategoryBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const subcategory = await SubCategory.findOne({ slug });
        res.status(201).json({
            status: 201,
            success: true,
            message: "SubCategory fetched successfully",
            data: subcategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error fetching SubCategory",
            error: error
        });
    }
};

// @desc Update SubCategory
// @route /api/SubCategory/update-SubCategory/:id
// @access Private
export const updateSubCategory = async (req, res) => {
    try {
        const { subcategoryId } = req.params;
       
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(subcategoryId, req.body, {
            new: true
        });
        if (!updatedSubCategory) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "SubCategory not found"
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "SubCategory updated successfully",
            data: updatedSubCategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error updating SubCategory",
            error: error
        });
    }
};


// @desc Delete SubCategory
// @route /api/SubCategory/delete-SubCategory/:SubCategoryId
// @access Private
export const deleteSubCategory = async (req, res) => {
    try {
        const { subcategoryId } = req.params;
        const deletedSubCategory = await SubCategory.findByIdAndDelete(subcategoryId);
        if (!deletedSubCategory) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "SubCategory not found"
            });
        };
        res.status(200).json({
            status: 200,
            success: true,
            message: "SubCategory deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error deleting SubCategory",
            error: error
        });
    }
};