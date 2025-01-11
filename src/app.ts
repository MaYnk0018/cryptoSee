import dotenv from "dotenv";
import express from 'express';
import {connectDB} from './config/database.js';
import {cryptoRoutes} from './route/cryptoRoutes.js';
import { startPriceUpdateJob } from './job/update.js';
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();


app.use(express.json());


app.use('/', cryptoRoutes);


startPriceUpdateJob();


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});