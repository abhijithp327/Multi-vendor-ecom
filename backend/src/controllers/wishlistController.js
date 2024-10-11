import { Wishlist } from "../models/wishlistModel.js";


// @desc Create new Wishlist
// @route /api/wishlist/create-Wishlist
// @access Private

export const createWishlist = async (req, res) => {
    try {
        const wishlistData = req.body;
        const newWishlist = await Wishlist.create(wishlistData);
        res.status(201).json({
            status: 201,
            success: true,
            message: "Wishlist created successfully",
            data: newWishlist
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error creating Wishlist",
            error: error
        });
    }
};


// @desc Get all Wishlist
// @route /api/wishlist/get-all-Wishlists
// @access Public
export const getAllWishlist = async (req, res) => {
    try {
        const wishlists = await Wishlist.find();
        res.status(201).json({
            status: 201,
            success: true,
            message: "Wishlists fetched successfully",
            data: wishlists
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

// @desc Get a wishlist by slug
// @route /api/wishlist/get-Wishlist-by-slug/:slug
// @access Public

export const getAWishlist = async (req, res) => {
    try {
        const { wishlistId } = req.params;
        const wishlist = await Wishlist.findById(wishlistId);
        res.status(201).json({
            status: 201,
            success: true,
            message: "Wishlist fetched successfully",
            data: wishlist
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error fetching Wishlist",
            error: error
        });
    }
};

// @desc Update Wishlist
// @route /api/Wishlist/update-Wishlist/:id
// @access Private
export const updateWishlist = async (req, res) => {
    try {
        const { wishlistId } = req.params;
       
        const updatedWishlist = await Wishlist.findByIdAndUpdate(wishlistId, req.body, {
            new: true
        });
        if (!updatedWishlist) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Wishlist not found"
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Wishlist updated successfully",
            data: updatedWishlist
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error updating Wishlist",
            error: error
        });
    }
};


// @desc Delete Wishlist
// @route /api/Wishlist/delete-Wishlist/:WishlistId
// @access Private
export const deleteWishlist = async (req, res) => {
    try {
        const { wishlistId } = req.params;
        const deletedWishlist = await Wishlist.findByIdAndDelete(wishlistId);
        if (!deletedWishlist) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Wishlist not found"
            });
        };
        res.status(200).json({
            status: 200,
            success: true,
            message: "Wishlist deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error deleting Wishlist",
            error: error
        });
    }
};