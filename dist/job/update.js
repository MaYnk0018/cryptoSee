import cron from 'node-cron';
import { coinGeckoService } from '../services/coin.js';
import { CryptoPriceData } from '../model/coin.js';
import { config } from '../config/config.js';
async function updateCryptoPrices() {
    try {
        for (const coinId of config.validCoins) {
            const data = await coinGeckoService.getCoinData(coinId);
            await CryptoPriceData.create({
                coinId,
                priceUSD: data.priceUSD,
                marketCapUSD: data.marketCapUSD,
                change24h: data.change24h
            });
            console.log(`Updated data for ${coinId}`);
        }
    }
    catch (error) {
        console.error('Error updating crypto prices:', error);
    }
}
export const startPriceUpdateJob = () => {
    cron.schedule('0 */2 * * *', updateCryptoPrices);
    updateCryptoPrices();
};
