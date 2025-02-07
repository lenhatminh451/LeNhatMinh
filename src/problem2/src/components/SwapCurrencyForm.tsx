import { useState, useEffect } from "react";
import useExchangeRates from "../hooks/useExchangeRates";
import TokenSelect from "./TokenSelect";

// Helper function to format numbers with commas
const formatNumberWithCommas = (value: number) => {
    return value.toLocaleString(undefined, { maximumFractionDigits: 4 });
};

const SwapCurrencyForm = () => {
    // State for form inputs
    const [fromCurrency, setFromCurrency] = useState<string>("ETH");
    const [toCurrency, setToCurrency] = useState<string>("BLUR");
    const [amount, setAmount] = useState<string>("");
    const [convertedAmount, setConvertedAmount] = useState<string>("");

    // Fetch real-time exchange rates
    const { prices, loading, error } = useExchangeRates();
    const tokenList = Object.keys(prices);

    // Function to calculate and update converted amount
    const updateConvertedAmount = () => {
        // Remove commas before conversion
        const numericAmount = parseFloat(amount.replace(/,/g, "")); 

        if (isNaN(numericAmount) || !prices[fromCurrency] || !prices[toCurrency]) {
            setConvertedAmount(""); // Clear formatted amount when invalid
            return;
        }
        
        const fromPrice = prices[fromCurrency];
        const toPrice = prices[toCurrency];

        const calculatedAmount = (numericAmount * fromPrice) / toPrice;
        setConvertedAmount(formatNumberWithCommas(calculatedAmount));
    }

    // Effect to update convertedAmount when `amount` or `toCurrency` changes
    useEffect(() => {
         // Not recalculate if currencies are the same
         if (fromCurrency === toCurrency) {
            setConvertedAmount(formatNumberWithCommas(parseFloat(amount.replace(/,/g, "")) || 0));
            return;
        }

        // Recalculate
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
                    type="text"
                    placeholder="Enter amount"
                    value={formatNumberWithCommas(parseFloat(amount) || 0)}
                    onChange={(e) => {
                        const rawValue = e.target.value.replace(/,/g, ""); // Remove commas on input
                        if (!isNaN(Number(rawValue)) || rawValue === "") {
                            setAmount(rawValue);
                        }
                    }}
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
                    type="text"
                    className="read-only-input"
                    value={convertedAmount}
                    readOnly
                />
            </form>
        </div>
    )
}

export default SwapCurrencyForm;