const SwapCurrencyForm = () => {
    return (
        <div className="form-container">
            <h2>Currency Swap</h2>
            <form>
                {/* 'From' Currency Selection */}
                <label htmlFor="from-currency">From:</label>
                <select
                    id="from-currency"
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
                    min="0"
                />

                {/* 'To' Currency Selection */}
                <label htmlFor="to-currency">To:</label>
                <select
                    id="to-currency"
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
                    readOnly
                />
            </form>
        </div>
    )
}

export default SwapCurrencyForm;