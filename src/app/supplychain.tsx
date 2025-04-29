"use client";

import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import { client } from "./client";
import Link from "next/link";
import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
// Import the following when ready for production:
// import { getContract } from "thirdweb";
// import { ethereum } from "thirdweb/chains";

// IMPORTANT: Replace this with your actual contract address when going live
// const SERVICE_CONTRACT_ADDRESS = "0x7801F9E69d012bb36eDC73DA716EaDb5086635F3";

export default function SupplyChain() {
    // State management
    // - selectedService: Currently selected service (id or null)
    // - selectedPlan: Selected pricing plan ('basic', 'standard', 'premium' or null)
    // - businessType: Selected business category (id or null)
    // - isLoading: Whether a transaction is in progress
    // - success: Whether to show the success message
    // - error: Error message to display (or null)
    const [selectedService, setSelectedService] = useState<number | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [businessType, setBusinessType] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Get the connected wallet using thirdweb hook
    const account = useActiveAccount();

    // Services data with detailed descriptions and pricing plans
    // This extends your existing services array with pricing information
    const services = [
        {
            id: 1,
            title: "Tokenized Supply Chain Goods",
            description: "Create tokenized representations of physical inventory and goods, enabling easier tracking, trading, and financing on the blockchain.",
            benefits: "Enhanced tracking, simplified trading, transparent ownership, and improved financing options with minimal entry costs.",
            pricing: {
                basic: {
                    price: "0.01 ETH",
                    features: ["Up to 5 tokenized items", "Basic tracking", "30-day support"]
                },
                standard: {
                    price: "0.05 ETH",
                    features: ["Up to 50 tokenized items", "Advanced tracking", "90-day support", "Trading enabled"]
                },
                premium: {
                    price: "0.15 ETH",
                    features: ["Unlimited tokenized items", "Real-time tracking", "Financing options", "Priority support"]
                }
            }
        },
        {
            id: 2,
            title: "Automated Supply Chain Smart Contracts",
            description: "Custom smart contracts that automate critical aspects of supply chain operations, including order processing, payment execution, and delivery tracking.",
            benefits: "Reduced operational costs, minimized human error, enhanced efficiency, and fully customizable to specific business needs.",
            pricing: {
                basic: {
                    price: "0.02 ETH",
                    features: ["Basic order processing", "Single payment method", "Manual tracking"]
                },
                standard: {
                    price: "0.08 ETH",
                    features: ["Advanced order processing", "Multiple payment options", "Automated tracking"]
                },
                premium: {
                    price: "0.25 ETH",
                    features: ["Custom workflow automation", "Multi-signature payments", "Real-time tracking"]
                }
            }
        },
        {
            id: 3,
            title: "Decentralized Marketplace",
            description: "A blockchain-powered platform where businesses can list and access supply chain-related services including logistics, warehousing, and materials sourcing.",
            benefits: "Direct business connections, reduced intermediary costs, transparent service ratings, and secure payment processing.",
            pricing: {
                basic: {
                    price: "0.01 ETH/month",
                    features: ["Basic listing (up to 5 items)", "Standard visibility", "Basic analytics"]
                },
                standard: {
                    price: "0.05 ETH/month",
                    features: ["Enhanced listing (up to 25 items)", "Priority placement", "Detailed analytics"]
                },
                premium: {
                    price: "0.15 ETH/month",
                    features: ["Unlimited listings", "Featured placement", "Advanced analytics", "Custom branding"]
                }
            }
        },
        {
            id: 4,
            title: "Supply Chain Data Marketplaces",
            description: "Secure platform for companies to sell and purchase supply chain data, including trends, demand forecasts, and supplier performance metrics.",
            benefits: "Monetization of existing data, access to valuable industry insights, and enhanced decision-making capabilities.",
            pricing: {
                basic: {
                    price: "0.02 ETH/month",
                    features: ["Basic data access", "Monthly updates", "Standard formats"]
                },
                standard: {
                    price: "0.10 ETH/month",
                    features: ["Premium data access", "Weekly updates", "Multiple formats", "Basic API access"]
                },
                premium: {
                    price: "0.30 ETH/month",
                    features: ["Full data library access", "Real-time updates", "Custom formats", "Full API integration"]
                }
            }
        },
        {
            id: 5,
            title: "Supply Chain Insurance",
            description: "Blockchain-based insurance solutions where businesses can insure goods or shipments with automatic claims processing when predefined conditions are met.",
            benefits: "Streamlined claims process, reduced premiums, transparent terms, and customizable coverage options.",
            pricing: {
                basic: {
                    price: "0.01 ETH + 0.5%",
                    features: ["Basic coverage", "48-hour claims processing", "Standard conditions"]
                },
                standard: {
                    price: "0.03 ETH + 1%",
                    features: ["Enhanced coverage", "24-hour claims processing", "Customizable conditions"]
                },
                premium: {
                    price: "0.05 ETH + 2%",
                    features: ["Comprehensive coverage", "Instant claims processing", "Fully customizable conditions"]
                }
            }
        },
        {
            id: 6,
            title: "Cross-Border Payment Solutions",
            description: "Low-cost international payment solutions leveraging blockchain for faster, cheaper, and more secure global transactions for supply chain businesses.",
            benefits: "Reduced fees, faster settlement times, eliminated currency conversion costs, and enhanced security.",
            pricing: {
                basic: {
                    price: "0.01 ETH + 0.5%",
                    features: ["Basic currency support", "3-day settlement", "Standard security"]
                },
                standard: {
                    price: "0.02 ETH + 0.75%",
                    features: ["Multi-currency support", "1-day settlement", "Enhanced security"]
                },
                premium: {
                    price: "0.05 ETH + 1%",
                    features: ["All currencies supported", "Instant settlement", "Advanced security and reporting"]
                }
            }
        },
        {
            id: 7,
            title: "Invoice Financing",
            description: "Enable businesses to tokenize and finance their outstanding invoices on the blockchain, improving cash flow without traditional lending constraints.",
            benefits: "Improved cash flow, reduced financing costs, faster funding, and expanded access to capital for growing businesses.",
            pricing: {
                basic: {
                    price: "0.02 ETH + 5% APR",
                    features: ["Up to $10,000 financing", "7-day processing", "30-90 day terms"]
                },
                standard: {
                    price: "0.05 ETH + 4% APR",
                    features: ["Up to $50,000 financing", "3-day processing", "Flexible terms"]
                },
                premium: {
                    price: "0.10 ETH + 3% APR",
                    features: ["Unlimited financing", "Same-day processing", "Custom terms"]
                }
            }
        },
        {
            id: 8,
            title: "Automated Supply Chain Financing Pools",
            description: "Decentralized financing pools that automatically match lenders with supply chain businesses seeking funding, all managed through smart contracts.",
            benefits: "Competitive interest rates, automated matching process, diversified risk, and transparent lending terms.",
            pricing: {
                basic: {
                    price: "0.01 ETH + 1% fee",
                    features: ["Access to basic pool", "Standard matching", "Fixed terms"]
                },
                standard: {
                    price: "0.03 ETH + 0.75% fee",
                    features: ["Access to enhanced pools", "Priority matching", "Flexible terms"]
                },
                premium: {
                    price: "0.08 ETH + 0.5% fee",
                    features: ["Access to all pools", "Premium matching", "Custom terms", "Preferential rates"]
                }
            }
        }
    ];

    // Business type categories
    const targetBusinesses = [
        { id: 1, name: "Small and Medium Enterprises (SMEs)" },
        { id: 2, name: "Logistics and Freight Companies" },
        { id: 3, name: "E-commerce Businesses" },
        { id: 4, name: "Tech Startups and Innovators" }
    ];

    /**
     * Handle service selection
     *
     * @param serviceId - The ID of the service being selected/deselected
     */
    const handleServiceSelect = (serviceId: number) => {
        // Clear any previous error
        setError(null);

        // Toggle selection: If already selected, deselect it; otherwise select it
        if (selectedService === serviceId) {
            setSelectedService(null);
            setSelectedPlan(null);
            setBusinessType(null);
        } else {
            setSelectedService(serviceId);
            setSelectedPlan(null); // Reset plan when changing service
            setBusinessType(null); // Reset business type
        }
    };

    /**
     * Handle plan selection
     *
     * @param plan - The pricing tier being selected ('basic', 'standard', or 'premium')
     */
    const handlePlanSelect = (plan: string) => {
        setError(null);
        setSelectedPlan(plan);
    };

    /**
     * Handle business type selection
     *
     * @param businessId - The ID of the business type being selected
     */
    const handleBusinessTypeSelect = (businessId: number) => {
        setError(null);
        setBusinessType(businessId);
    };

    /**
     * Get price in Wei for selected service and plan
     * Will be used for blockchain transactions
     *
     * @returns The price in Wei as a string
     */
    const getSelectedPrice = (): string => {
        if (!selectedService || !selectedPlan) return "0";

        const service = services.find(s => s.id === selectedService);
        if (!service) return "0";

        // Extract numeric part from price string (assumes format like "0.01 ETH")
        const priceString = service.pricing[selectedPlan as keyof typeof service.pricing].price;
        const priceMatch = priceString.match(/(\d+\.\d+)/);

        if (priceMatch && priceMatch[1]) {
            const ethPrice = parseFloat(priceMatch[1]);
            // Convert ETH to Wei (1 ETH = 10^18 Wei)
            return (ethPrice * 1e18).toString();
        }

        // Default prices if parsing fails
        switch (selectedPlan) {
            case 'basic': return "10000000000000000"; // 0.01 ETH
            case 'standard': return "50000000000000000"; // 0.05 ETH
            case 'premium': return "150000000000000000"; // 0.15 ETH
            default: return "0";
        }
    };

    /**
     * Handle service purchase
     * Processes the blockchain transaction (or simulation during development)
     */
    const handlePurchase = async () => {
        // Reset any previous error
        setError(null);

        // Check wallet connection
        if (!account) {
            setError("Please connect your wallet to purchase a service");
            return;
        }

        // Validate selections
        if (!selectedService || !selectedPlan || !businessType) {
            setError("Please complete all selections before purchasing");
            return;
        }

        setIsLoading(true);

        try {
            // Get price in Wei
            const priceWei = getSelectedPrice();

            // DEVELOPMENT MODE: Simulate blockchain transaction with a delay
            // REMOVE THIS SECTION WHEN GOING LIVE WITH REAL BLOCKCHAIN INTEGRATION
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Store purchase in local storage for development purposes only
            // REMOVE THIS WHEN GOING LIVE - this is just for testing the UI flow
            const storedServices = localStorage.getItem('looptrust_purchased_services');
            const services = storedServices ? JSON.parse(storedServices) : [];

            services.push({
                serviceId: selectedService,
                planType: selectedPlan,
                businessType,
                purchaseDate: Date.now()
            });

            localStorage.setItem('looptrust_purchased_services', JSON.stringify(services));

            // PRODUCTION MODE: Uncomment this section when going live
            // This code interacts with your actual blockchain contract
            /*
            // Get contract instance
            const contract = getContract({
                client,
                chain: ethereum,
                address: SERVICE_CONTRACT_ADDRESS as `0x${string}`
            });

            // Convert plan type to numeric value for the contract
            const planTypeValue = selectedPlan === 'basic' ? 0 : selectedPlan === 'standard' ? 1 : 2;
            
            // Call the contract function to purchase a service
            const transaction = await contract.write.purchaseService(
                [selectedService, planTypeValue, businessType],
                { value: priceWei } // Send ETH with the transaction
            );
            
            // Wait for transaction confirmation
            await transaction.wait();
            */

            // Show success state and reset form
            setIsLoading(false);
            setSuccess(true);

            // Reset after showing success message
            setTimeout(() => {
                setSuccess(false);
                setSelectedService(null);
                setSelectedPlan(null);
                setBusinessType(null);
            }, 3000);

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

    /**
     * Render success message popup
     * Shown after successful purchase
     */
    const renderSuccessMessage = () => {
        if (!success) return null;

        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-zinc-800 p-6 rounded-lg border border-blue-500 max-w-md mx-auto text-center"
                     style={{ boxShadow: "0 0 15px rgba(80, 191, 255, 0.5)" }}>
                    <div className="bg-blue-500/20 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                        <span className="text-blue-400 text-3xl">✓</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Purchase Successful!</h3>
                    <p className="text-zinc-300 mb-4">Your service has been activated. You can now track and manage it in your dashboard.</p>
                    <Link
                        href="/supply-chain-tracking"
                        className="py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded inline-block"
                    >
                        Go to Tracking Dashboard
                    </Link>
                </div>
            </div>
        );
    };

    /**
     * Render error message
     * Shows validation or transaction errors
     */
    const renderErrorMessage = () => {
        if (!error) return null;

        return (
            <div className="bg-red-900/30 border border-red-500 p-3 rounded mb-4">
                <p className="text-red-300 text-sm">{error}</p>
            </div>
        );
    };

    // Main component render
    return (
        <div className="relative min-h-screen">
            {/* Background Image */}
            <Image
                src="/looptrust_background.png"
                alt="Background"
                fill
                style={{
                    objectFit: "cover",
                    filter: "brightness(1.3)"
                }}
                quality={100}
                className="z-0"
                priority
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

            {/* Content */}
            <main className="relative z-20 p-4 pb-10 min-h-screen flex items-center justify-center container max-w-screen-lg mx-auto">
                <div className="py-20">
                    <Header />

                    <div className="flex justify-center mb-10">
                        <div className="connect-button">
                            <ConnectButton
                                client={client}
                                appMetadata={{
                                    name: "LoopTrust Finance",
                                    url: "https://looptrust.finance"
                                }}
                            />
                        </div>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg max-w-4xl mx-auto"
                         style={{ boxShadow: "0 0 15px rgba(80, 191, 255, 0.5)" }}>
                        <h2 className="text-2xl font-semibold mb-4 text-white text-center">Supply Chain Management</h2>

                        <div className="mb-6">
                            <p className="text-zinc-200 mb-3">LoopTrust Finance offers innovative blockchain solutions for supply chain management, providing transparency, efficiency, and cost reduction for businesses of all sizes.</p>
                            <p className="text-zinc-200 mb-3">Our smart contract technology enables secure and automated supply chain operations with minimal fees and maximum reliability.</p>
                        </div>

                        {/* Error message (if any) */}
                        {renderErrorMessage()}

                        {/* Services */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4 text-blue-400">Our Supply Chain Services</h3>

                            <div className="grid grid-cols-1 gap-6">
                                {services.map(service => (
                                    <div
                                        key={service.id}
                                        className={`bg-zinc-800/80 p-5 rounded-lg border-l-4 border-blue-500 cursor-pointer transition-all duration-300 ${selectedService === service.id ? 'ring-2 ring-blue-400' : ''}`}
                                        onClick={() => handleServiceSelect(service.id)}
                                    >
                                        <h4 className="text-lg font-medium text-white mb-2">{service.title}</h4>
                                        {selectedService === service.id ? (
                                            <>
                                                <p className="text-zinc-300 mb-3">{service.description}</p>
                                                <div className="bg-zinc-700/50 p-3 rounded text-zinc-100 text-sm mb-4">
                                                    <span className="text-blue-400 font-medium">Benefits: </span>
                                                    {service.benefits}
                                                </div>

                                                {/* Pricing plans - only show for selected service */}
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
                                                            <p className="text-blue-400 font-bold mb-2">{service.pricing.basic.price}</p>
                                                            <ul className="text-zinc-300 text-sm space-y-1">
                                                                {service.pricing.basic.features.map((feature, index) => (
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
                                                            <p className="text-blue-400 font-bold mb-2">{service.pricing.standard.price}</p>
                                                            <ul className="text-zinc-300 text-sm space-y-1">
                                                                {service.pricing.standard.features.map((feature, index) => (
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
                                                            <p className="text-blue-400 font-bold mb-2">{service.pricing.premium.price}</p>
                                                            <ul className="text-zinc-300 text-sm space-y-1">
                                                                {service.pricing.premium.features.map((feature, index) => (
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
                                                            {targetBusinesses.map(business => (
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
                                ))}
                            </div>
                        </div>

                        {/* Target Businesses */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-3 text-blue-400">Target Businesses</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                <div className="bg-zinc-700/50 p-3 rounded border-l-4 border-blue-500 text-zinc-100">Small and Medium Enterprises (SMEs)</div>
                                <div className="bg-zinc-700/50 p-3 rounded border-l-4 border-blue-500 text-zinc-100">Logistics and Freight Companies</div>
                                <div className="bg-zinc-700/50 p-3 rounded border-l-4 border-blue-500 text-zinc-100">E-commerce Businesses</div>
                                <div className="bg-zinc-700/50 p-3 rounded border-l-4 border-blue-500 text-zinc-100">Tech Startups and Innovators</div>
                            </div>
                        </div>

                        {/* Navigation buttons */}
                        <div className="flex justify-center gap-4 mt-6">
                            <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded transition-colors">
                                Back to Home
                            </Link>
                            <Link href="/supply-chain-tracking" className="bg-zinc-700 hover:bg-zinc-600 text-white font-medium py-2 px-6 rounded transition-colors">
                                Go to Tracking
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Success message popup */}
            {renderSuccessMessage()}
        </div>
    );
}

// Header component with logo and title
function Header() {
    return (
        <header className="flex flex-col items-center mb-20 md:mb-10">
            <Image
                src="/looptrust_logo.png"
                alt="LoopTrust Logo"
                width={350}
                height={80}
                style={{
                    filter: "drop-shadow(0px 0px 24px #50bfff)" // Blue glow
                }}
            />

            <div className="mb-8"></div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6 text-white">
                LoopTrust Finance
            </h1>
            <p className="text-gray-200 text-xl text-center italic max-w-2xl mb-4 font-medium">
                Pioneering the future of finance with advanced blockchain protocols.
            </p>
        </header>
    );
}