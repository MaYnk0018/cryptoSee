import dotenv from "dotenv";
import express from 'express';
import {connectDB} from './config/database.js';
import {cryptoRoutes} from './route/cryptoRoutes.js';
import { startPriceUpdateJob } from './job/update.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
dotenv.config()

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();


app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/', cryptoRoutes);


startPriceUpdateJob();


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
