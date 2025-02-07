import { useState, useEffect } from "react";

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

                const data = await response.json();
                const priceMap: TokenPrices = {};

                // Convert price list into a key-value object
                data.forEach((token: { currency: string; price: number }) => {
                    priceMap[token.currency] = token.price;
                });

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