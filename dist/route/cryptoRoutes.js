import { Router } from 'express';
import { cryptoService } from '../services/crypto.js';
import { config } from '../config/config.js';
const router = Router();
const validateCoinId = (req, res, next) => {
    if (!config.validCoins.includes(req.query.coin)) {
        res.status(400).json({
            error: `Invalid coin. Must be one of: ${config.validCoins.join(', ')}`
        });
        return;
    }
    next();
};
router.get('/stats', validateCoinId, async (req, res) => {
    try {
        const stats = await cryptoService.getLatestStats(req.query.coin);
        res.json(stats);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/deviation', validateCoinId, async (req, res) => {
    try {
        const deviation = await cryptoService.getPriceDeviation(req.query.coin);
        res.json(deviation);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export const cryptoRoutes = router;
