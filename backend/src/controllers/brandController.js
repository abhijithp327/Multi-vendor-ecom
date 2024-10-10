import slugify from "slugify";
import { Brand } from "../models/brandModel.js";


// @desc Create new Brand
// @route /api/brand/create-Brand
// @access Private
export const createBrand = async (req, res) => {
    try {
        const brandData = req.body;
        // Check if the vendor already exists
        const existingBrand = await Brand.findOne({ name: brandData.name });

        if (existingBrand) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Brand with this Brand name already exists",
                data: existingBrand
            });
        };
        // Generate slug for the store name
        const slug = slugify(brandData.name, { lower: true });
        // Add the slug to the Brand data
        brandData.slug = slug;
        const newBrand = await Brand.create(brandData);
        res.status(201).json({
            status: 201,
            success: true,
            message: "Brand created successfully",
            data: newBrand
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error creating Brand",
            error: error
        });
    }
};


// @desc Get all Brand
// @route /api/brand/get-all-Brands
// @access Public
export const getAllBrand = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(201).json({
            status: 201,
            success: true,
            message: "Brands fetched successfully",
            data: brands
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error fetching Brands",
            error: error
        });
    }
};

// @desc Get a brand by slug
// @route /api/brand/get-Brand-by-slug/:slug
// @access Public
export const getBrandBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const brand = await Brand.findOne({ slug });
        res.status(201).json({
            status: 201,
            success: true,
            message: "Brand fetched successfully",
            data: brand
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error fetching Brand",
            error: error
        });
    }
};

// @desc Update Brand
// @route /api/Brand/update-Brand/:id
// @access Private
export const updateBrand = async (req, res) => {
    try {
        const { brandId } = req.params;
       
        const updatedBrand = await Brand.findByIdAndUpdate(brandId, req.body, {
            new: true
        });
        if (!updatedBrand) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Brand not found"
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Brand updated successfully",
            data: updatedBrand
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error updating Brand",
            error: error
        });
    }
};


// @desc Delete Brand
// @route /api/Brand/delete-Brand/:BrandId
// @access Private
export const deleteBrand = async (req, res) => {
    try {
        const { brandId } = req.params;
        const deletedBrand = await Brand.findByIdAndDelete(brandId);
        if (!deletedBrand) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Brand not found"
            });
        };
        res.status(200).json({
            status: 200,
            success: true,
            message: "Brand deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error deleting Brand",
            error: error
        });
    }
};