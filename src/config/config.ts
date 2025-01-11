import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/crypto_tracker',
  validCoins: ['bitcoin', 'matic-network', 'ethereum'] as const
} as const;

export type ValidCoin = typeof config.validCoins[number];