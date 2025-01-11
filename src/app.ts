import dotenv from "dotenv";
import express from 'express';
import {connectDB} from './config/database.ts';
import {cryptoRoutes} from './route/cryptoRoutes.ts';
import { startPriceUpdateJob } from './job/update.ts';
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