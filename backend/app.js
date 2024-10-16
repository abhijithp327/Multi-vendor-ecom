import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { dbConnect } from './src/utils/dbConfig.js';
import morgan from 'morgan';
// import { errorHandler, notFoundErrorHandler } from './src/middlewares/errorHandler.js';

import userRoutes from './src/routes/userRoutes.js';
import vendorRoutes from './src/routes/vendorRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import brandRoutes from './src/routes/brandRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import subcategoryRoutes from './src/routes/subcategoryRoutes.js';
import wishlistRoutes from './src/routes/wishlistRoutes.js';
import reviewRoutes from './src/routes/reviewRoutes.js';


const app = express();
dotenv.config();

dbConnect();

const PORT = process.env.PORT || 5003;

app.get("/", (req, res) => {
    res.json("MultiVendor Backend Server is up and running ✅");
});

// middlewares
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Api routes
app.use('/api/user', userRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/product', productRoutes);
app.use('/api/brand', brandRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/subcategory', subcategoryRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/review', reviewRoutes);

// Error handler middleware
// app.use(errorHandler);
// app.use(notFoundErrorHandler);


app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});