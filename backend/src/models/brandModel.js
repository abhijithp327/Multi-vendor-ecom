import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    logo: {
        type: String,
        required: true
    },

},
    {
        timestamps: true
    });


export const Brand = mongoose.model('Brand', brandSchema)