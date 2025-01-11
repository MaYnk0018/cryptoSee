export interface CoinData {
  priceUSD: number;
  marketCapUSD: number;
  change24h: number;
}

export interface CryptoStats {
  price: number;
  marketCap: number;
  "Change": number;
}

export interface PriceDeviation {
  deviation: number;
}
