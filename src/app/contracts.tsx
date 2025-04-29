import { createThirdwebClient, getContract } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { useActiveAccount } from "thirdweb/react";
import { ethereum } from "thirdweb/chains";
import { NextPage } from "next";
import { useState, useEffect } from "react";

const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || ""
});

// Contract addresses
const contractAddresses = [
    "0x7801F9E69d012bb36eDC73DA716EaDb5086635F3",
    "0x92fd9BE46d324c7F0c8be67C336c735Af8EF8d59",
    "0x465B780Ec804EdC085B14901939111A13159AD5e",
    "0x7A233a24f5C8F5703294b08aeB3AdFdBa15e704a",
    "0x5cf73f7909CA15fC8F0Bcbd718E54A6f295a7A1e"
];

// Define the contract interface
interface SmartContract {
    read: {
        FLAT_FEE_USD: () => Promise<bigint>;
        ORDER_THRESHOLD_USD: () => Promise<bigint>;
        PERCENT_FEE_BPS: () => Promise<bigint>;
        getContractBalance: () => Promise<bigint>;
        OrderValueUSD: () => Promise<bigint>;
    };
}

const Home: NextPage = () => {
    const account = useActiveAccount();
    const [contractDetails, setContractDetails] = useState<any[]>(
        new Array(contractAddresses.length).fill(null)
    );

    // Create contract instances
    const contracts = contractAddresses.map(address =>
        getContract({
            client,
            chain: ethereum,
            address: address as `0x${string}`
        })
    );

    // Fetch contract details
    useEffect(() => {
        const fetchContractDetails = async () => {
            try {
                const details = await Promise.all(
                    contracts.map(async (contract) => {
                        try {
                            // Cast contract to our interface
                            const typedContract = contract as unknown as SmartContract;

                            // Fetch various contract details using the read methods
                            const [
                                flatFee,
                                orderThreshold,
                                percentFee,
                                contractBalance,
                                orderValue
                            ] = await Promise.all([
                                typedContract.read.FLAT_FEE_USD(),
                                typedContract.read.ORDER_THRESHOLD_USD(),
                                typedContract.read.PERCENT_FEE_BPS(),
                                typedContract.read.getContractBalance(),
                                typedContract.read.OrderValueUSD()
                            ]);

                            return {
                                flatFee: Number(flatFee),
                                orderThreshold: Number(orderThreshold),
                                percentFee: Number(percentFee),
                                contractBalance: Number(contractBalance),
                                orderValue: Number(orderValue)
                            };
                        } catch (error) {
                            console.error("Error fetching contract details:", error);
                            return null;
                        }
                    })
                );
                setContractDetails(details);
            } catch (error) {
                console.error("Overall error:", error);
            }
        };

        if (account) {
            void fetchContractDetails();
        }
    }, [account, contracts]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            gap: '20px'
        }}>
            <ConnectButton client={client} />

            {account && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    width: '100%',
                    maxWidth: '600px'
                }}>
                    {contracts.map((contract, index) => (
                        <div
                            key={contractAddresses[index]}
                            style={{
                                border: '1px solid #333',
                                padding: '15px',
                                borderRadius: '8px',
                                backgroundColor: '#1a1a1a'
                            }}
                        >
                            <h3>Contract {index + 1}</h3>
                            <p>Address: {contractAddresses[index]}</p>

                            {contractDetails[index] ? (
                                <div>
                                    <p>Flat Fee: ${contractDetails[index].flatFee}</p>
                                    <p>Order Threshold: ${contractDetails[index].orderThreshold}</p>
                                    <p>Percent Fee: {contractDetails[index].percentFee} BPS</p>
                                    <p>Contract Balance: {contractDetails[index].contractBalance}</p>
                                    <p>Order Value: ${contractDetails[index].orderValue}</p>
                                </div>
                            ) : (
                                <p>Loading contract details...</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
