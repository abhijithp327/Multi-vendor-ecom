import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }]

},
    {
        timestamps: true
    });


export const wishlist = mongoose.model('Wishlist', wishlistSchema);