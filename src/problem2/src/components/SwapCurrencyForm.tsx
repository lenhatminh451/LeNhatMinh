import { useState, useEffect } from "react";
import useExchangeRate from "../hooks/useExchangeRates";

const SwapCurrencyForm = () => {
    // State for form inputs
    const [fromCurrency, setFromCurrency] = useState<string>("ETH");
    const [toCurrency, setToCurrency] = useState<string>("BLUR");
    const [amount, setAmount] = useState<string>("");
    const [convertedAmount, setConvertedAmount] = useState<number>(0);

    // Fetch real-time exchange rates
    const { prices, loading, error } = useExchangeRate();

    // Function to calculate and update converted amount
    const updateConvertedAmount = () => {
        console.log(prices);
        if (!prices[fromCurrency] || !prices[toCurrency])
            return;
        
        const fromPrice = prices[fromCurrency];
        const toPrice = prices[toCurrency];

        const numericAmount = parseFloat(amount) || 0;  // Convert amount from string to number
        setConvertedAmount((numericAmount * fromPrice) / toPrice);
    }

    // Effect to update convertedAmount when `amount` or `toCurrency` changes
    useEffect(() => {
        updateConvertedAmount();
    }, [amount, fromCurrency, toCurrency, prices]);

    return (
        <div className="form-container">
            <h2>Currency Swap</h2>
            {loading && <p>Loading exchange rates...</p>}
            {error && <p className="error-message">{error}</p>}

            <form>
                {/* 'From' Currency Selection */}
                <label htmlFor="from-currency">From:</label>
                <select
                    id="from-currency"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                >
                    {Object.keys(prices).map(token => (
                        <option key={token} value={token}>{token}</option>
                    ))}
                </select>

                {/* Amount Input */}
                <label htmlFor="amount">Amount to Send:</label>
                <input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                {/* 'To' Currency Selection */}
                <label htmlFor="to-currency">To:</label>
                <select
                    id="to-currency"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                >
                    {Object.keys(prices).map(token => (
                        <option key={token} value={token}>{token}</option>
                    ))}
                </select> 

                {/* Amount to Receive */}
                <label htmlFor="converted-amount">Amount to Receive:</label>
                <input
                    id="converted-amount"
                    type="number"
                    value={convertedAmount.toFixed(4)}
                    readOnly
                />
            </form>
        </div>
    )
}

export default SwapCurrencyForm;