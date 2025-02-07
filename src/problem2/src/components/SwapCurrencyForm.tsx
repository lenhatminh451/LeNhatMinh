import { useState, useEffect } from "react";
import useExchangeRates from "../hooks/useExchangeRates";
import TokenSelect from "./TokenSelect";

const SwapCurrencyForm = () => {
    // State for form inputs
    const [fromCurrency, setFromCurrency] = useState<string>("ETH");
    const [toCurrency, setToCurrency] = useState<string>("BLUR");
    const [amount, setAmount] = useState<string>("");
    const [convertedAmount, setConvertedAmount] = useState<number>(0);

    // Fetch real-time exchange rates
    const { prices, loading, error } = useExchangeRates();
    const tokenList = Object.keys(prices);

    // Function to calculate and update converted amount
    const updateConvertedAmount = () => {
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
                <TokenSelect
                    tokens={tokenList}
                    selectedToken={fromCurrency}
                    onChange={setFromCurrency}
                />

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
                <TokenSelect
                    tokens={tokenList}
                    selectedToken={toCurrency}
                    onChange={setToCurrency}
                />

                {/* Amount to Receive */}
                <label htmlFor="converted-amount">Amount to Receive:</label>
                <input
                    id="converted-amount"
                    type="number"
                    className="read-only-input"
                    value={convertedAmount.toFixed(4)}
                    readOnly
                />
            </form>
        </div>
    )
}

export default SwapCurrencyForm;