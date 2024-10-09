import mongoose from "mongoose";


const orderItemsSchema = new mongoose.Schema({

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        min: 1,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },

},
    {
        _id: false,
        timestamps: true
    }
);


const cancellationSchema = new mongoose.Schema({

    reason: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },

},
    {
        _id: false
    }
);


const returnSchema = new mongoose.Schema({

    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },

},
    {
        _id: false
    }
);


const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [orderItemsSchema],
    totalPrice: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
    },
    paymentMethod: {
        type: String,
        enum: ['cash_on_delivery', 'card', 'paypal'],
        required: true
    },
    cancellation: cancellationSchema,
    return: returnSchema,

},
    {
        timestamps: true
    }
);


export const order = mongoose.model('Order', orderSchema)