import { useState } from "react";

interface TokenSelectProps {
    tokens: string[],
    selectedToken: string,
    onChange: (token: string) => void;
}

const TokenSelect = ({ tokens, selectedToken, onChange }: TokenSelectProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const getTokenIcon = (token: string) => {
        // Convert token name to match GitHub repo
        let formattedToken = token;

        // Handle special case where token symbols are different from json
        const tokenFixes: Record<string, string> = {
            "STEVMOS": "stEVMOS",
            "RATOM": "rATOM",
            "STOSMO": "stOSMO",
            "STATOM": "stATOM",
            "STLUNA": "stLUNA",
        };

        if (tokenFixes[token])
            formattedToken = tokenFixes[token];

        return `https://raw.githubusercontent.com/Switcheo/token-icons/refs/heads/main/tokens/${formattedToken}.svg`;
    }

    return (
        <div className="custom-dropdown">
            <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
                <img src={getTokenIcon(selectedToken)} alt={selectedToken} className="token-icon"/>
                {selectedToken}
            </div>

            {isOpen && (
                <ul className="dropdown-list">
                    {tokens.map((token) => (
                        <li key={token} onClick={() => {
                            onChange(token);
                            setIsOpen(false);
                        }}>
                            <img src={getTokenIcon(token)} alt={token} className="token-icon"/>
                            {token}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TokenSelect;