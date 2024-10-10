import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
},
    {
        timestamps: true
    }
);

export const SubCategory = mongoose.model('SubCategory', subCategorySchema);