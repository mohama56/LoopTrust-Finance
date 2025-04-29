"use client";

import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import thirdwebIcon from "@public/looptrust_logo.png";
import { client } from "./client";
import { useState } from "react";

export default function Home() {
    const [selectedContent, setSelectedContent] = useState<string | null>(null);

    // Function to handle button clicks
    const handleButtonClick = (content: string) => {
        setSelectedContent(content);
    };

    // Render content based on selection
    const renderContent = () => {
        switch (selectedContent) {
            case 'about':
                return (
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg max-w-4xl mx-auto"
                         style={{ boxShadow: "0 0 15px rgba(80, 191, 255, 0.5)" }}>
                        <h2 className="text-2xl font-semibold mb-4 text-white text-center">About LoopTrust Finance</h2>

                        <div className="mb-6">
                            <p className="text-zinc-200 mb-3">LoopTrust Finance is pioneering the future of finance with advanced blockchain protocols.</p>
                            <p className="text-zinc-200 mb-3">Our mission is to provide secure, transparent, and efficient financial services using blockchain technology.</p>
                            <p className="text-zinc-200 mb-3">Founded in March 2025, we specialize in creating smart contracts that enable seamless financial transactions with minimal fees. LoopTrust has been introduced to the Cornell University MSBA Quantitative Finance Club.</p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-3 text-blue-400">Trust and Low Fees</h3>
                            <p className="text-zinc-200 mb-3">Our platform is built on the foundation of trust, with all contracts optimized on Remix Solidarity. Our system undergoes calibration after 200 runs to ensure maximum efficiency and security.</p>
                            <p className="text-zinc-200 mb-3">We're committed to making blockchain finance accessible through minimal transaction fees compared to traditional financial systems.</p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-3 text-blue-400">Next Phase Projects</h3>
                            <p className="text-zinc-200 mb-3">In our upcoming development phases, we plan to expand LoopTrust Finance with these supply chain solutions:</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                <div className="bg-zinc-700/50 p-3 rounded border-l-4 border-blue-500 text-zinc-100">Supply Chain Financing Through Tokenization</div>
                                <div className="bg-zinc-700/50 p-3 rounded border-l-4 border-blue-500 text-zinc-100">Decentralized Marketplace for Supply Chain Goods</div>
                                <div className="bg-zinc-700/50 p-3 rounded border-l-4 border-blue-500 text-zinc-100">Invoice Financing (Receivables Financing)</div>
                                <div className="bg-zinc-700/50 p-3 rounded border-l-4 border-blue-500 text-zinc-100">Supply Chain Insurance via Smart Contracts</div>
                                <div className="bg-zinc-700/50 p-3 rounded border-l-4 border-blue-500 text-zinc-100">Supply Chain Data Marketplaces</div>
                                <div className="bg-zinc-700/50 p-3 rounded border-l-4 border-blue-500 text-zinc-100">Cross-Border Payment Solutions</div>
                                <div className="bg-zinc-700/50 p-3 rounded border-l-4 border-blue-500 text-zinc-100 mx-auto md:col-span-2 md:max-w-md">Automated Supply Chain Financing Pools</div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-3 text-blue-400">Future Audits</h3>
                            <p className="text-zinc-200 mb-3">We have planned comprehensive smart contract audits with leading blockchain security firms to ensure our platform meets the highest standards of security and reliability.</p>
                        </div>

                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => setSelectedContent(null)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded transition-colors"
                            >
                                Back to Home
                            </button>
                        </div>
                    </div>
                );
            case 'contracts':
                return (
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg max-w-4xl mx-auto"
                         style={{ boxShadow: "0 0 15px rgba(80, 191, 255, 0.5)" }}>
                        <h2 className="text-2xl font-semibold mb-4 text-white text-center">View Contracts</h2>

                        <div className="mb-6">
                            <p className="text-zinc-200 mb-3">Connect your wallet to view and interact with our available smart contracts.</p>
                            <p className="text-zinc-200 mb-3">Our contracts provide the following services:</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                <div className="bg-zinc-700/50 p-3 rounded border-l-4 border-blue-500 text-zinc-100">Flat Fee Transactions</div>
                                <div className="bg-zinc-700/50 p-3 rounded border-l-4 border-blue-500 text-zinc-100">Percentage-based Fee Structures</div>
                                <div className="bg-zinc-700/50 p-3 rounded border-l-4 border-blue-500 text-zinc-100">Order Threshold Management</div>
                                <div className="bg-zinc-700/50 p-3 rounded border-l-4 border-blue-500 text-zinc-100">Balance Tracking</div>
                                <div className="bg-zinc-700/50 p-3 rounded border-l-4 border-blue-500 text-zinc-100 mx-auto md:col-span-2 md:max-w-md">Order Value Assessment</div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-3 text-blue-400">Contract Optimization</h3>
                            <p className="text-zinc-200 mb-3">All our smart contracts undergo rigorous optimization on Remix Solidarity with calibrations occurring after 200 runs to ensure maximum efficiency and minimal gas costs.</p>
                        </div>

                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => setSelectedContent(null)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded transition-colors"
                            >
                                Back to Home
                            </button>
                        </div>
                    </div>
                );
            case 'supplychain':
                return (
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg max-w-4xl mx-auto"
                         style={{ boxShadow: "0 0 15px rgba(80, 191, 255, 0.5)" }}>
                        <h2 className="text-2xl font-semibold mb-4 text-white text-center">Supply Chain Management</h2>

                        <div className="mb-6">
                            <p className="text-zinc-200 mb-3">LoopTrust Finance offers innovative blockchain solutions for supply chain management, providing transparency, efficiency, and cost reduction for businesses of all sizes.</p>
                            <p className="text-zinc-200 mb-3">Our smart contract technology enables secure and automated supply chain operations with minimal fees and maximum reliability.</p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4 text-blue-400">Our Supply Chain Services</h3>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="bg-zinc-800/80 p-5 rounded-lg border-l-4 border-blue-500">
                                    <h4 className="text-lg font-medium text-white mb-2">Tokenized Supply Chain Goods</h4>
                                    <p className="text-zinc-300 mb-3">Create tokenized representations of physical inventory and goods, enabling easier tracking, trading, and financing on the blockchain.</p>
                                    <div className="bg-zinc-700/50 p-3 rounded text-zinc-100 text-sm">
                                        <span className="text-blue-400 font-medium">Benefits:</span> Enhanced tracking, simplified trading, transparent ownership, and improved financing options with minimal entry costs.
                                    </div>
                                </div>

                                <div className="bg-zinc-800/80 p-5 rounded-lg border-l-4 border-blue-500">
                                    <h4 className="text-lg font-medium text-white mb-2">Automated Supply Chain Smart Contracts</h4>
                                    <p className="text-zinc-300 mb-3">Custom smart contracts that automate critical aspects of supply chain operations, including order processing, payment execution, and delivery tracking.</p>
                                    <div className="bg-zinc-700/50 p-3 rounded text-zinc-100 text-sm">
                                        <span className="text-blue-400 font-medium">Benefits:</span> Reduced operational costs, minimized human error, enhanced efficiency, and fully customizable to specific business needs.
                                    </div>
                                </div>

                                <div className="bg-zinc-800/80 p-5 rounded-lg border-l-4 border-blue-500">
                                    <h4 className="text-lg font-medium text-white mb-2">Decentralized Marketplace for Supply Chain Services</h4>
                                    <p className="text-zinc-300 mb-3">A blockchain-powered platform where businesses can list and access supply chain-related services including logistics, warehousing, and materials sourcing.</p>
                                    <div className="bg-zinc-700/50 p-3 rounded text-zinc-100 text-sm">
                                        <span className="text-blue-400 font-medium">Benefits:</span> Direct business connections, reduced intermediary costs, transparent service ratings, and secure payment processing.
                                    </div>
                                </div>

                                <div className="bg-zinc-800/80 p-5 rounded-lg border-l-4 border-blue-500">
                                    <h4 className="text-lg font-medium text-white mb-2">Supply Chain Data Marketplaces</h4>
                                    <p className="text-zinc-300 mb-3">Secure platform for companies to sell and purchase supply chain data, including trends, demand forecasts, and supplier performance metrics.</p>
                                    <div className="bg-zinc-700/50 p-3 rounded text-zinc-100 text-sm">
                                        <span className="text-blue-400 font-medium">Benefits:</span> Monetization of existing data, access to valuable industry insights, and enhanced decision-making capabilities.
                                    </div>
                                </div>

                                <div className="bg-zinc-800/80 p-5 rounded-lg border-l-4 border-blue-500">
                                    <h4 className="text-lg font-medium text-white mb-2">Supply Chain Insurance via Smart Contracts</h4>
                                    <p className="text-zinc-300 mb-3">Blockchain-based insurance solutions where businesses can insure goods or shipments with automatic claims processing when predefined conditions are met.</p>
                                    <div className="bg-zinc-700/50 p-3 rounded text-zinc-100 text-sm">
                                        <span className="text-blue-400 font-medium">Benefits:</span> Streamlined claims process, reduced premiums, transparent terms, and customizable coverage options.
                                    </div>
                                </div>

                                <div className="bg-zinc-800/80 p-5 rounded-lg border-l-4 border-blue-500">
                                    <h4 className="text-lg font-medium text-white mb-2">Cross-Border Payment Solutions</h4>
                                    <p className="text-zinc-300 mb-3">Low-cost international payment solutions leveraging blockchain for faster, cheaper, and more secure global transactions for supply chain businesses.</p>
                                    <div className="bg-zinc-700/50 p-3 rounded text-zinc-100 text-sm">
                                        <span className="text-blue-400 font-medium">Benefits:</span> Reduced fees, faster settlement times, eliminated currency conversion costs, and enhanced security.
                                    </div>
                                </div>

                                <div className="bg-zinc-800/80 p-5 rounded-lg border-l-4 border-blue-500">
                                    <h4 className="text-lg font-medium text-white mb-2">Invoice Financing (Receivables Financing)</h4>
                                    <p className="text-zinc-300 mb-3">Enable businesses to tokenize and finance their outstanding invoices on the blockchain, improving cash flow without traditional lending constraints.</p>
                                    <div className="bg-zinc-700/50 p-3 rounded text-zinc-100 text-sm">
                                        <span className="text-blue-400 font-medium">Benefits:</span> Improved cash flow, reduced financing costs, faster funding, and expanded access to capital for growing businesses.
                                    </div>
                                </div>

                                <div className="bg-zinc-800/80 p-5 rounded-lg border-l-4 border-blue-500">
                                    <h4 className="text-lg font-medium text-white mb-2">Automated Supply Chain Financing Pools</h4>
                                    <p className="text-zinc-300 mb-3">Decentralized financing pools that automatically match lenders with supply chain businesses seeking funding, all managed through smart contracts.</p>
                                    <div className="bg-zinc-700/50 p-3 rounded text-zinc-100 text-sm">
                                        <span className="text-blue-400 font-medium">Benefits:</span> Competitive interest rates, automated matching process, diversified risk, and transparent lending terms.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-3 text-blue-400">Target Businesses</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                <div className="bg-zinc-700/50 p-3 rounded border-l-4 border-blue-500 text-zinc-100">Small and Medium Enterprises (SMEs)</div>
                                <div className="bg-zinc-700/50 p-3 rounded border-l-4 border-blue-500 text-zinc-100">Logistics and Freight Companies</div>
                                <div className="bg-zinc-700/50 p-3 rounded border-l-4 border-blue-500 text-zinc-100">E-commerce Businesses</div>
                                <div className="bg-zinc-700/50 p-3 rounded border-l-4 border-blue-500 text-zinc-100">Tech Startups and Innovators</div>
                            </div>
                        </div>

                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => setSelectedContent(null)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded transition-colors"
                            >
                                Back to Home
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="relative min-h-screen">
            {/* Background Image - Restored to original positioning */}
            <Image
                src="/looptrust_background.png"
                alt="Background"
                fill
                style={{
                    objectFit: "cover",
                    filter: "brightness(1.3)" // Brightened up
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

                    {!selectedContent && (
                        <>
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
                            <ResourceButtons onSelectContent={handleButtonClick} />
                        </>
                    )}

                    {selectedContent && renderContent()}
                </div>
            </main>
        </div>
    );
}

function Header() {
    return (
        <header className="flex flex-col items-center mb-20 md:mb-10">
            <Image
                src={thirdwebIcon}
                alt="LoopTrust Logo"
                width={350}
                height={80}
                style={{
                    filter: "drop-shadow(0px 0px 24px #50bfff)" // Blue glow
                }}
            />

            <div className="mb-8"></div> {/* Added space */}
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6 text-white">
                LoopTrust Finance
            </h1>
            <p className="text-gray-200 text-xl text-center italic max-w-2xl mb-4 font-medium">
                Pioneering the future of finance with advanced blockchain protocols.
            </p>
        </header>
    );
}

function ResourceButtons({ onSelectContent }: { onSelectContent: (content: string) => void }) {
    return (
        <div className="grid gap-4 lg:grid-cols-4 justify-center">
            <ArticleCard
                title="About LoopTrust"
                description="Learn about our mission, vision, and blockchain solutions"
                onClick={() => onSelectContent('about')}
            />
            <ArticleCard
                title="Supply Chain Management"
                description="Blockchain solutions for supply chain operations"
                onClick={() => onSelectContent('supplychain')}
            />
            <ArticleCard
                title="View Contracts"
                description="Explore our available smart contracts and services"
                onClick={() => onSelectContent('contracts')}
            />
            <ArticleCard
                title="ThirdWeb Dashboard"
                href="https://thirdweb.com/dashboard"
                description="Manage and deploy smart contracts with ease"
            />
        </div>
    );
}

function ArticleCard(props: {
    title: string;
    description: string;
    href?: string;
    onClick?: () => void;
}) {
    if (props.href) {
        return (
            <a
                href={props.href + "?utm_source=next-template"}
                target="_blank"
                className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700 text-center h-full"
                style={{
                    boxShadow: "0 0 15px rgba(80, 191, 255, 0.5)",
                    borderColor: "rgba(80, 191, 255, 0.3)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <article className="flex flex-col items-center justify-center">
                    <h2 className="text-lg font-semibold mb-2 text-white">{props.title}</h2>
                    <p className="text-sm text-zinc-200">{props.description}</p>
                </article>
            </a>
        );
    } else {
        return (
            <button
                onClick={props.onClick}
                className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700 text-center h-full"
                style={{
                    boxShadow: "0 0 15px rgba(80, 191, 255, 0.5)",
                    borderColor: "rgba(80, 191, 255, 0.3)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <article className="flex flex-col items-center justify-center">
                    <h2 className="text-lg font-semibold mb-2 text-white">{props.title}</h2>
                    <p className="text-sm text-zinc-200">{props.description}</p>
                </article>
            </button>
        );
    }
}