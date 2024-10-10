import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({

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
    subCategory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubCategory',
        },
    ],
},
    {
        timestamps: true
    });


export const Category = mongoose.model('Category', categorySchema)