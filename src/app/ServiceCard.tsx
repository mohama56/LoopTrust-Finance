"use client";

import React, { useState } from 'react';
import { useActiveAccount } from "thirdweb/react";

// Define the service pricing tier interface
interface PricingTier {
    price: string;
    features: string[];
}

// Define the service interface
interface ServiceProps {
    id: number;
    title: string;
    description: string;
    benefits: string;
    pricing: {
        basic: PricingTier;
        standard: PricingTier;
        premium: PricingTier;
    };
    onServiceSelect?: (serviceId: number) => void;
    isSelected: boolean;
}

/**
 * ServiceCard Component
 *
 * An enhanced, interactive service card component that displays service details
 * and allows users to select pricing plans and make purchases.
 */
const ServiceCard: React.FC<ServiceProps> = ({
                                                 id,
                                                 title,
                                                 description,
                                                 benefits,
                                                 pricing,
                                                 onServiceSelect,
                                                 isSelected
                                             }) => {
    // State for component
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [businessType, setBusinessType] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Get user's connected wallet
    const account = useActiveAccount();

    // Business types available for selection
    const businessTypes = [
        { id: 1, name: "Small and Medium Enterprises (SMEs)" },
        { id: 2, name: "Logistics and Freight Companies" },
        { id: 3, name: "E-commerce Businesses" },
        { id: 4, name: "Tech Startups and Innovators" }
    ];

    // Handle plan selection
    const handlePlanSelect = (plan: string) => {
        setSelectedPlan(plan);
        setError(null);
    };

    // Handle business type selection
    const handleBusinessTypeSelect = (businessId: number) => {
        setBusinessType(businessId);
        setError(null);
    };

    // Handle purchase of service
    const handlePurchase = async () => {
        // Validate necessary conditions
        if (!account) {
            setError("Please connect your wallet to purchase a service");
            return;
        }

        if (!selectedPlan || !businessType) {
            setError("Please complete all selections before purchasing");
            return;
        }

        setIsLoading(true);

        try {
            // In production, this would be a real contract call
            // For now, we'll simulate with a timeout

            // Get selected price in wei for the contract call
            let priceWei = "0";
            switch (selectedPlan) {
                case 'basic':
                    priceWei = pricing.basic.price.includes("ETH")
                        ? (parseFloat(pricing.basic.price) * 1e18).toString()
                        : "10000000000000000"; // 0.01 ETH
                    break;
                case 'standard':
                    priceWei = pricing.standard.price.includes("ETH")
                        ? (parseFloat(pricing.standard.price) * 1e18).toString()
                        : "50000000000000000"; // 0.05 ETH
                    break;
                case 'premium':
                    priceWei = pricing.premium.price.includes("ETH")
                        ? (parseFloat(pricing.premium.price) * 1e18).toString()
                        : "150000000000000000"; // 0.15 ETH
                    break;
            }

            // Simulate blockchain transaction
            await new Promise(resolve => setTimeout(resolve, The));

            /* REAL CONTRACT CALL WOULD LOOK LIKE THIS:
            const contract = getContract({
              client,
              chain: ethereum,
              address: SERVICE_CONTRACT_ADDRESS as `0x${string}`
            });
      
            const transaction = await contract.write.purchaseService(
              [id, selectedPlan === 'basic' ? 0 : selectedPlan === 'standard' ? 1 : 2, businessType],
              { value: priceWei }
            );
            
            // Wait for transaction confirmation
            await transaction.wait();
            */

            // Store purchase in local storage for development
            const storedServices = localStorage.getItem('looptrust_purchased_services');
            const services = storedServices ? JSON.parse(storedServices) : [];

            services.push({
                serviceId: id,
                planType: selectedPlan,
                businessType,
                purchaseDate: Date.now()
            });

            localStorage.setItem('looptrust_purchased_services', JSON.stringify(services));

            // Complete the purchase
            setIsLoading(false);

            // Reset state and show success
            setTimeout(() => {
                setSelectedPlan(null);
                setBusinessType(null);
                // Redirect to tracking dashboard or show success message
                window.location.href = "/supply-chain-tracking";
            }, 1000);

        } catch (err) {
            // Handle transaction errors
            setIsLoading(false);

            if (err instanceof Error) {
                setError(`Error: ${err.message}`);
            } else {
                setError("An unknown error occurred");
            }

            console.error("Purchase error:", err);
        }
    };

    return (
        <div
            className={`bg-zinc-800/80 p-5 rounded-lg border-l-4 border-blue-500 cursor-pointer transition-all duration-300 ${isSelected ? 'ring-2 ring-blue-400' : ''}`}
            onClick={() => onServiceSelect && onServiceSelect(id)}
        >
            {/* Service Title */}
            <h4 className="text-lg font-medium text-white mb-2">{title}</h4>

            {isSelected ? (
                <>
                    {/* Description */}
                    <p className="text-zinc-300 mb-3">{description}</p>

                    {/* Benefits */}
                    <div className="bg-zinc-700/50 p-3 rounded text-zinc-100 text-sm mb-4">
                        <span className="text-blue-400 font-medium">Benefits: </span>
                        {benefits}
                    </div>

                    {/* Error message if any */}
                    {error && (
                        <div className="bg-red-900/30 border border-red-500 p-3 rounded my-3">
                            <p className="text-red-300 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Pricing plans */}
                    <div className="mt-4">
                        <h5 className="text-md font-medium text-blue-400 mb-2">Pricing Plans</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {/* Basic Plan */}
                            <div
                                className={`bg-zinc-700/70 p-4 rounded cursor-pointer hover:bg-zinc-600/70 transition-colors border ${selectedPlan === 'basic' ? 'border-blue-400' : 'border-transparent'}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePlanSelect('basic');
                                }}
                            >
                                <h6 className="text-white font-medium mb-2">Basic</h6>
                                <p className="text-blue-400 font-bold mb-2">{pricing.basic.price}</p>
                                <ul className="text-zinc-300 text-sm space-y-1">
                                    {pricing.basic.features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-green-400 mr-1">✓</span> {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Standard Plan */}
                            <div
                                className={`bg-zinc-700/70 p-4 rounded cursor-pointer hover:bg-zinc-600/70 transition-colors border ${selectedPlan === 'standard' ? 'border-blue-400' : 'border-transparent'}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePlanSelect('standard');
                                }}
                            >
                                <h6 className="text-white font-medium mb-2">Standard</h6>
                                <p className="text-blue-400 font-bold mb-2">{pricing.standard.price}</p>
                                <ul className="text-zinc-300 text-sm space-y-1">
                                    {pricing.standard.features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-green-400 mr-1">✓</span> {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Premium Plan */}
                            <div
                                className={`bg-zinc-700/70 p-4 rounded cursor-pointer hover:bg-zinc-600/70 transition-colors border ${selectedPlan === 'premium' ? 'border-blue-400' : 'border-transparent'}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePlanSelect('premium');
                                }}
                            >
                                <h6 className="text-white font-medium mb-2">Premium</h6>
                                <p className="text-blue-400 font-bold mb-2">{pricing.premium.price}</p>
                                <ul className="text-zinc-300 text-sm space-y-1">
                                    {pricing.premium.features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-green-400 mr-1">✓</span> {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Business type selection - only show if plan is selected */}
                    {selectedPlan && (
                        <div className="mt-6">
                            <h5 className="text-md font-medium text-blue-400 mb-2">Select Your Business Type</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {businessTypes.map(business => (
                                    <div
                                        key={business.id}
                                        className={`bg-zinc-700/50 p-3 rounded cursor-pointer border-l-4 border-blue-500 transition-colors ${
                                            businessType === business.id ? 'ring-2 ring-blue-400' : 'hover:bg-zinc-600/50'
                                        }`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleBusinessTypeSelect(business.id);
                                        }}
                                    >
                                        <p className="text-zinc-100">{business.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Purchase button - only show if all selections are made */}
                    {selectedPlan && businessType && (
                        <div className="mt-6">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePurchase();
                                }}
                                disabled={isLoading || !account}
                                className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors disabled:bg-zinc-600 disabled:cursor-not-allowed"
                                style={{ boxShadow: "0 0 10px rgba(80, 191, 255, 0.5)" }}
                            >
                                {isLoading
                                    ? "Processing..."
                                    : account
                                        ? "Purchase Service"
                                        : "Connect Wallet to Purchase"
                                }
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <p className="text-zinc-400">Click to view details and pricing</p>
            )}
        </div>
    );
};

export default ServiceCard;