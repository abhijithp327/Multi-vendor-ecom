import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'vendor'],
        default: 'user'
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
    phone: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
},
    {
        timestamps: true
    }
);

export const User = mongoose.model('User', userSchema);