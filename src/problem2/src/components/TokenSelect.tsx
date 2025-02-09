import { useState, useEffect, useRef } from "react";

interface TokenSelectProps {
    tokens: string[],
    selectedToken: string,
    onChange: (token: string) => void;
}

const TokenSelect = ({ tokens, selectedToken, onChange }: TokenSelectProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        // Add event listener when the component is mounted
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup function
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    return (
        <div className="custom-dropdown"  ref={dropdownRef}>
            <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
                <div className="dropdown-left">
                    <img src={getTokenIcon(selectedToken)} alt={selectedToken} className="token-icon"/>
                    {selectedToken}
                </div>
                <span className="dropdown-icon">▼</span>
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