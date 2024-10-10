import slugify from "slugify";
import { Product } from "../models/productModel.js";


// @desc Create new product
// @route /api/product/create-product
// @access Private
export const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        // Check if the vendor already exists
        const existingProduct = await Product.findOne({ name: productData.name });

        if (existingProduct) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Product with this product name already exists",
                data: existingProduct
            });
        };
        // Generate slug for the store name
        const slug = slugify(productData.name, { lower: true });
        // Add the slug to the product data
        productData.slug = slug;
        const newProduct = await Product.create(productData);
        res.status(201).json({
            status: 201,
            success: true,
            message: "Product created successfully",
            data: newProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error creating product",
            error: error
        });
    }
};


// @desc Get all product
// @route /api/product/get-all-products
// @access Public
export const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(201).json({
            status: 201,
            success: true,
            message: "Products fetched successfully",
            data: products
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error fetching products",
            error: error
        });
    }
};

// @desc Get a product by slug
// @route /api/product/get-product-by-slug/:slug
// @access Public
export const getProductBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await Product.findOne({ slug });
        res.status(201).json({
            status: 201,
            success: true,
            message: "Product fetched successfully",
            data: product
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error fetching product",
            error: error
        });
    }
};

// @desc Update product
// @route /api/product/update-product/:id
// @access Private
export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name } = req.body;
        // Check if another product with the same name exists (excluding the current product)
        if (name) {
            const existingProduct = await Product.findOne({ name, _id: { $ne: productId } });
            if (existingProduct) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: `Product with name "${name}" already exists`
                });
            }
        }
        // Check if another product with the same slug exists (excluding the current product)
        if (req.body.slug) {
            const existingProduct = await Product.findOne({ slug: req.body.slug, _id: { $ne: productId } });
            if (existingProduct) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: `Product with name "${name}" already exists`
                });
            }
        }
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
            new: true
        });
        if (!updatedProduct) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error updating product",
            error: error
        });
    }
};


// @desc Delete product
// @route /api/product/delete-product/:productId
// @access Private
export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Product not found"
            });
        };
        res.status(200).json({
            status: 200,
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error deleting product",
            error: error
        });
    }
};