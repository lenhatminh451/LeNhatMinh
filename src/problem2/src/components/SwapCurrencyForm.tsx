import { useState, useEffect } from "react";

const SwapCurrencyForm = () => {
    // State for form inputs
    const [fromCurrency, setFromCurrency] = useState<string>("ETH");
    const [toCurrency, setToCurrency] = useState<string>("BTC");
    const [amount, setAmount] = useState<string>("");
    const [convertedAmount, setConvertedAmount] = useState<number>(0);

    // Mock exchange rates (to be replaced with API)
    const exchangeRates: Record<string, Record<string, number>> = {
        ETH: { BTC: 0.06, USDC: 2500 },
        BTC: { ETH: 16.67, USDC: 40000 },
        USDC: { ETH: 0.0004, BTC: 0.000025 }
    };

    // Function to calculate and update converted amount
    const updateConvertedAmount = () => {
        const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1;
        const numericAmount = parseFloat(amount) || 0;  // Convert amount from string to number
        setConvertedAmount(numericAmount * rate);
    }

    // Effect to update convertedAmount when `amount` or `toCurrency` changes
    useEffect(() => {
        updateConvertedAmount();
    }, [amount, fromCurrency, toCurrency]);

    return (
        <div className="form-container">
            <h2>Currency Swap</h2>
            <form>
                {/* 'From' Currency Selection */}
                <label htmlFor="from-currency">From:</label>
                <select
                    id="from-currency"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                >
                    <option value={"ETH"}>ETH</option>
                    <option value={"BTC"}>BTC</option>
                    <option value={"USDC"}>USDC</option>
                </select>

                {/* Amount Input */}
                <label htmlFor="amount">Amount to Send:</label>
                <input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    min="0"
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
                    <option value={"ETH"}>ETH</option>
                    <option value={"BTC"}>BTC</option>
                    <option value={"USDC"}>USDC</option>
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