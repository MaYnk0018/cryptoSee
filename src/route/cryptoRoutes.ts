import { Router } from 'express';
import { cryptoService } from '../services/crypto.ts';
import { config, ValidCoin } from '../config/config.js';

const router = Router();

const validateCoinId = (req: any, res: any, next: any): void => {
  if (!config.validCoins.includes(req.query.coin as ValidCoin)) {
    res.status(400).json({ 
      error: `Invalid coin. Must be one of: ${config.validCoins.join(', ')}` 
    });
    return;
  }
  next();
};

router.get('/stats', validateCoinId, async (req, res) => {
  try {
    const stats = await cryptoService.getLatestStats(req.query.coin as ValidCoin);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get('/deviation', validateCoinId, async (req, res) => {
  try {
    const deviation = await cryptoService.getPriceDeviation(req.query.coin as ValidCoin);
    res.json(deviation);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export const cryptoRoutes = router;