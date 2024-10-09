import slugify from "slugify";
import { Vendor } from "../models/vendorModel.js";



// @desc create vendor 
// @route /api/vendor/create-vendor
// @access Private (we a user login then only we can create vendor)

export const createVendor = async (req, res) => {
    try {

        const vendorData = req.body;

        // Check if the vendor already exists
        const existingVendor = await Vendor.findOne({ storeName: vendorData.storeName });

        if (existingVendor) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Vendor with this store name already exists",
                data: existingVendor
            });
        };

        // Generate slug for the store name
        const slug = slugify(vendorData.storeName, { lower: true });

        // Add the slug to the vendor data
        vendorData.slug = slug;

        const newVendor = await Vendor.create(vendorData);

        res.status(201).json({
            status: 201,
            success: true,
            message: "Vendor created successfully",
            data: newVendor
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to create vendor",
            error: error
        });
    }
};


// @desc Get all vendor 
// @route /api/vendor/get-all-vendors
// @access Public

export const getAllVendors = async (req, res) => {
    try {

        const vendors = await Vendor.find()
            .populate({
                path: 'user',
                select: '-password'
            })

        res.status(201).json({
            status: 201,
            success: true,
            message: "Vendor fetched successfully",
            data: vendors
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to fetch vendor",
            error: error
        });
    }
};



// @desc Get vendor by slug
// @route /api/vendor/get-vendor-by-slug
// @access Public

export const getVendorBySlug = async (req, res) => {
    try {

        const { slug } = req.params;

        const vendor = await Vendor.findOne({ slug })
            .populate({
                path: 'user',
                select: '-password'
            })

        res.status(201).json({
            status: 201,
            success: true,
            message: "Vendor fetched successfully",
            data: vendor
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to fetch vendor",
            error: error
        });
    }
};


// @desc update vendor
// @route /api/vendor/update-vendor
// @access Private (we a user login then only we can update vendor)

export const updateVendor = async (req, res) => {
    try {

        const { vendorId } = req.params;
        const { storeName } = req.body;

        // Check if another vendor with the same storeName exists (excluding the current vendor)
        if (storeName) {
            const existingVendor = await Vendor.findOne({ storeName, _id: { $ne: vendorId } });

            if (existingVendor) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: `Vendor with store name "${storeName}" already exists`
                });
            }
        }

        const updatedVendor = await Vendor.findByIdAndUpdate(vendorId, req.body, {
            new: true
        });

        if (!updatedVendor) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Vendor not found"
            });
        };

        res.status(201).json({
            status: 201,
            success: true,
            message: "Vendor updated successfully",
            data: updatedVendor
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to update vendor",
            error: error
        });
    }
};


// @desc delete vendor
// @route /api/vendor/delete-vendor
// @access Private (we a user login then only we can update vendor)


export const deleteVendor = async (req, res) => {
    try {

        const { vendorId } = req.params;

        const deletedVendor = await Vendor.findByIdAndDelete(vendorId);

        if (!deletedVendor) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Vendor not found"
            });
        };

        res.status(201).json({
            status: 201,
            success: true,
            message: "Vendor deleted successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to delete vendor",
            error: error
        });
    };
};