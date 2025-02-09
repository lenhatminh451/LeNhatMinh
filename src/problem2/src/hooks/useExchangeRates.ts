import { useState, useEffect } from "react";

interface TokenPrice {
    currency: string;
    date: string;
    price: number;
}

interface TokenPrices {
    [symbol: string]: number;
}

const useExchangeRates = () => {
    const [prices, setPrices] = useState<TokenPrices>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch("https://interview.switcheo.com/prices.json");
                if (!response.ok) {
                    throw new Error("Failed to fetch token prices");
                }

                const data: TokenPrice[] = await response.json();
                const latestPrices: Record<string, TokenPrice> = {};

                // Keep the latest price based on the date field
                data.forEach((token) => {
                    if (
                        !latestPrices[token.currency] || 
                        new Date(token.date) > new Date(latestPrices[token.currency].date)
                    ) {
                        latestPrices[token.currency] = token;
                    }
                });

                // Convert filtered data into a map of { currency: price }
                const priceMap: TokenPrices = Object.fromEntries(
                    Object.entries(latestPrices).map(([symbol, token]) => [symbol, token.price])
                );

                setPrices(priceMap);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
    }, []);

    return { prices, loading, error };
};

export default useExchangeRates;