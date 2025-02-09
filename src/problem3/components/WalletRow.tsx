import React from "react";

interface WalletRowProps {
    className?: string;
    amount: number;
    usdValue: number;
    formattedAmount: string;
}

const WalletRow: React.FC<WalletRowProps> = ({ className, amount, usdValue, formattedAmount }) => {
    return (
        <div className={className}>
            <div>Amount: {amount}</div>
            <div>USD Value: {usdValue}</div>
            <div>Formatted Amount: {formattedAmount}</div>
        </div>
    )
};

export default WalletRow;