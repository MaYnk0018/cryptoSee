import cron from 'node-cron';
import { coinGeckoService } from '../services/coin.ts';
import { CryptoPriceData } from '../model/coin.ts';
import { config } from '../config/config.js';

async function updateCryptoPrices(): Promise<void> {
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
  } catch (error) {
    console.error('Error updating crypto prices:', error);
  }
}

export const startPriceUpdateJob = (): void => {
  cron.schedule('0 */2 * * *', updateCryptoPrices);
  
  updateCryptoPrices();
};
