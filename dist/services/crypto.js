import { CryptoPriceData } from '../model/coin.js';
import { calculateStandardDeviation } from '../utils/maths.js';
class CryptoService {
    async getLatestStats(coinId) {
        const latestData = await CryptoPriceData.findOne({ coinId }, { priceUSD: 1, marketCapUSD: 1, change24h: 1 }, { sort: { timestamp: -1 } });
        if (!latestData) {
            throw new Error('No data found for the specified coin');
        }
        return {
            price: latestData.priceUSD,
            marketCap: latestData.marketCapUSD,
            "Change": latestData.change24h
        };
    }
    async getPriceDeviation(coinId) {
        const priceData = await CryptoPriceData.find({ coinId }, { priceUSD: 1 }, { sort: { timestamp: -1 }, limit: 100 });
        if (!priceData.length) {
            throw new Error('No data found for the specified coin');
        }
        const prices = priceData.map(data => data.priceUSD);
        const deviation = calculateStandardDeviation(prices);
        return { deviation: parseFloat(deviation.toFixed(2)) };
    }
}
export const cryptoService = new CryptoService();
