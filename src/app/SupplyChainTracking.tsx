"use client";

import React, { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";

// Define ShipmentType interface - make sure this matches your existing interface
interface ShipmentType {
    sender: string;
    receiver: string;
    pickupTime: string | number;
    deliveryTime: string | number;
    distance: string | number;
    price: string | number;
    status: string | number;
    isPaid: boolean;
}

// Define TrackingContext type
interface TrackingContextType {
    createShipment: (receiver: string, pickupTime: string, distance: number, price: string) => Promise<boolean>;
    startShipment: (sender: string, index: number) => Promise<boolean>;
    completeShipment: (sender: string, index: number) => Promise<boolean>;
    getShipment: (sender: string, index: number) => Promise<ShipmentType | null>;
    allShipments: ShipmentType[];
    shipmentCount: number;
    isLoading: boolean;
    currentAccount: string;
}

// Create context
const TrackingContext = React.createContext<TrackingContextType | null>(null);

// TrackingProvider component - replace this in your SupplyChainTracking.tsx file
export const TrackingProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [shipmentCount, setShipmentCount] = useState(0);
    const [allShipments, setAllShipments] = useState<ShipmentType[]>([]);
    const account = useActiveAccount();

    // Load mock data when account changes
    useEffect(() => {
        if (account) {
            loadMockData();
        }
    }, [account]);

    // Load mock shipment data
    const loadMockData = () => {
        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            // Mock shipment data
            const mockShipments: ShipmentType[] = [
                {
                    sender: account?.address || "",
                    receiver: "0x1234567890123456789012345678901234567890",
                    pickupTime: Date.now() - 172800000, // 2 days ago
                    deliveryTime: 0,
                    distance: 150,
                    price: "0.05",
                    status: 1, // In transit
                    isPaid: false
                },
                {
                    sender: "0x9876543210987654321098765432109876543210",
                    receiver: account?.address || "",
                    pickupTime: Date.now() - 259200000, // 3 days ago
                    deliveryTime: Date.now() - 86400000, // 1 day ago
                    distance: 75,
                    price: "0.02",
                    status: 2, // Delivered
                    isPaid: true
                },
                {
                    sender: account?.address || "",
                    receiver: "0x5555555555555555555555555555555555555555",
                    pickupTime: Date.now() - 345600000, // 4 days ago
                    deliveryTime: 0,
                    distance: 200,
                    price: "0.07",
                    status: 0, // Pending
                    isPaid: false
                }
            ];

            setAllShipments(mockShipments);
            setShipmentCount(mockShipments.length);
            setIsLoading(false);
        }, 1000);
    };

    // Create a new shipment function
    const createShipment = async (receiver: string, pickupTime: string, distance: number, price: string): Promise<boolean> => {
        setIsLoading(true);

        // Simulate blockchain transaction
        return new Promise<boolean>((resolve) => {
            setTimeout(() => {
                // Create new shipment
                const newShipment: ShipmentType = {
                    sender: account?.address || "",
                    receiver,
                    pickupTime: new Date(pickupTime).getTime(),
                    deliveryTime: 0,
                    distance,
                    price,
                    status: 0, // Pending
                    isPaid: false
                };

                setAllShipments(prevShipments => [...prevShipments, newShipment]);
                setShipmentCount(prevCount => prevCount + 1);
                setIsLoading(false);
                resolve(true);
            }, 2000);
        });
    };

    // Start shipment function
    const startShipment = async (sender: string, index: number): Promise<boolean> => {
        setIsLoading(true);

        return new Promise<boolean>((resolve) => {
            setTimeout(() => {
                setAllShipments(prevShipments =>
                    prevShipments.map((shipment, i) => {
                        if (i === index && shipment.sender === sender) {
                            return {
                                ...shipment,
                                status: 1, // In transit
                                pickupTime: Date.now() // Update pickup time
                            };
                        }
                        return shipment;
                    })
                );

                setIsLoading(false);
                resolve(true);
            }, 2000);
        });
    };

    // Complete shipment function
    const completeShipment = async (sender: string, index: number): Promise<boolean> => {
        setIsLoading(true);

        return new Promise<boolean>((resolve) => {
            setTimeout(() => {
                setAllShipments(prevShipments =>
                    prevShipments.map((shipment, i) => {
                        if (i === index && shipment.sender === sender) {
                            return {
                                ...shipment,
                                status: 2, // Delivered
                                deliveryTime: Date.now(), // Update delivery time
                                isPaid: true // Mark as paid
                            };
                        }
                        return shipment;
                    })
                );

                setIsLoading(false);
                resolve(true);
            }, 2000);
        });
    };

    // Get shipment details function
    const getShipment = async (sender: string, index: number): Promise<ShipmentType | null> => {
        setIsLoading(true);

        return new Promise<ShipmentType | null>((resolve) => {
            setTimeout(() => {
                const shipment = allShipments[index];
                setIsLoading(false);

                if (shipment && shipment.sender === sender) {
                    resolve(shipment);
                } else {
                    resolve(null);
                }
            }, 1000);
        });
    };

    return (
        <TrackingContext.Provider
            value={{
                createShipment,
                startShipment,
                completeShipment,
                getShipment,
                allShipments,
                shipmentCount,
                isLoading,
                currentAccount: account?.address || ""
            }}
        >
            {children}
        </TrackingContext.Provider>
    );
};