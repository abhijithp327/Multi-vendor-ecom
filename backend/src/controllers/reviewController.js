import { Review } from "../models/reviewModel.js";


// @desc Create Review
// @route /api/review/create-review
// @access Private
export const createReview = async (req, res) => {

    try {

        const reviewData = req.body;
        const newReview = await Review.create(reviewData);
        res.status(201).json({
            status: 201,
            success: true,
            message: "Review created successfully",
            data: newReview
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error creating review",
            error: error
        });
    }

};

// @desc Get All Review
// @route /api/review/get-all-reviews
// @access Public
export const getAllReview = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(201).json({
            status: 201,
            success: true,
            message: "Reviews fetched successfully",
            data: reviews
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error fetching reviews",
            error: error
        });
    }
};

// @desc Get a Review
// @route /api/review/get-review/:reviewId
// @access Public
export const getAReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const review = await Review.findById(reviewId);
        res.status(201).json({
            status: 201,
            success: true,
            message: "Review fetched successfully",
            data: review
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error fetching review",
            error: error
        });
    }
};


// @desc update a Review
// @route /api/review/update-review/:reviewId
// @access Private
export const updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const updatedReview = await Review.findByIdAndUpdate(reviewId, req.body, {
            new: true
        });
        res.status(201).json({
            status: 201,
            success: true,
            message: "Review updated successfully",
            data: updatedReview
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error updating review",
            error: error
        });
    }
};


// @desc delete a Review
// @route /api/review/delete-review/:reviewId
// @access Private
export const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const deletedReview = await Review.findByIdAndDelete(reviewId);
        res.status(201).json({
            status: 201,
            success: true,
            message: "Review deleted successfully",
            data: deletedReview
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error deleting review",
            error: error
        });
    }
};


// @desc update is approve
// @route /api/review/approve-review/:reviewId
// @access Private

export const approveReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { isApproved } = req.body;
        const updatedReview = await Review.findByIdAndUpdate(reviewId, {
            isApproved
        }, {
            new: true
        });
        res.status(201).json({
            status: 201,
            success: true,
            message: "Review updated successfully",
            data: updatedReview
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Error updating review",
            error: error
        });
    };
};