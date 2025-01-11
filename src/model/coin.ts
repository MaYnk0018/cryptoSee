import mongoose, { Document, Schema } from 'mongoose';
import { ValidCoin } from '../config/config.js';

export interface ICryptoPriceData extends Document {
  coinId: ValidCoin;
  priceUSD: number;
  marketCapUSD: number;
  change24h: number;
  timestamp: Date;
}

const cryptoPriceDataSchema = new Schema<ICryptoPriceData>({
  coinId: {
    type: String,
    required: true,
    enum: ['bitcoin', 'matic-network', 'ethereum']
  },
  priceUSD: {
    type: Number,
    required: true
  },
  marketCapUSD: {
    type: Number,
    required: true
  },
  change24h: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

cryptoPriceDataSchema.index({ coinId: 1, timestamp: -1 });

export const CryptoPriceData = mongoose.model<ICryptoPriceData>('CryptoPriceData', cryptoPriceDataSchema);
