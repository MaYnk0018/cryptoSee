import mongoose, { Schema } from 'mongoose';
const cryptoPriceDataSchema = new Schema({
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
export const CryptoPriceData = mongoose.model('CryptoPriceData', cryptoPriceDataSchema);
