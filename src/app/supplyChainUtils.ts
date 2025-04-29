/**
 * LoopTrust Finance - Supply Chain Utilities
 *
 * This file contains utility constants and helper functions for the supply chain
 * management system. These utilities help maintain consistency across different
 * components and simplify common operations like formatting and data conversion.
 */

/**
 * SERVICE_TYPES - Enum-like object for service type identification
 * Used to identify different service types consistently across the application
 *
 * Example usage:
 *    if (serviceId === SERVICE_TYPES.TOKENIZED_GOODS) { ... }
 */
export const SERVICE_TYPES = {
    TOKENIZED_GOODS: 1,    // Tokenized representations of physical inventory
    SMART_CONTRACTS: 2,    // Automated supply chain smart contracts
    MARKETPLACE: 3,        // Decentralized marketplace for supply chain services
    DATA_MARKETPLACE: 4,   // Platform for buying/selling supply chain data
    INSURANCE: 5,          // Blockchain-based insurance solutions
    CROSS_BORDER: 6,       // International payment solutions
    INVOICE_FINANCING: 7,  // Tokenize and finance outstanding invoices
    FINANCING_POOLS: 8     // Decentralized financing pools for supply chain
};

/**
 * PLAN_TYPES - Enum-like object for service plan levels
 * Used to represent the three pricing tiers consistently
 *
 * Example usage:
 *    if (selectedPlan === PLAN_TYPES.PREMIUM) { ... }
 */
export const PLAN_TYPES = {
    BASIC: 'basic',        // Basic tier with essential features
    STANDARD: 'standard',  // Standard tier with additional features
    PREMIUM: 'premium'     // Premium tier with all features
};

/**
 * BUSINESS_TYPES - Enum-like object for business categories
 * Used to classify customer businesses consistently
 *
 * Example usage:
 *    if (businessType === BUSINESS_TYPES.SME) { ... }
 */
export const BUSINESS_TYPES = {
    SME: 1,              // Small and Medium Enterprises
    LOGISTICS: 2,        // Logistics and Freight Companies
    ECOMMERCE: 3,        // E-commerce Businesses
    TECH_STARTUP: 4      // Tech Startups and Innovators
};

/**
 * SHIPMENT_STATUS - Enum-like object for shipment status codes
 * Used to represent shipment states consistently across the application
 *
 * Example usage:
 *    if (shipment.status === SHIPMENT_STATUS.DELIVERED) { ... }
 */
export const SHIPMENT_STATUS = {
    PENDING: 0,          // Shipment created but not yet picked up
    IN_TRANSIT: 1,       // Shipment is in transit to destination
    DELIVERED: 2         // Shipment has been delivered
};

/**
 * formatDate - Converts a timestamp to a human-readable date string
 *
 * @param timestamp - Unix timestamp (in milliseconds) or string representation
 * @returns Formatted date string in local format or "Not available" if invalid
 *
 * Example usage:
 *    <p>Pickup Time: {formatDate(shipment.pickupTime)}</p>
 */
export const formatDate = (timestamp: string | number): string => {
    if (!timestamp || timestamp === "0") return "Not available";

    const date = new Date(Number(timestamp));
    return date.toLocaleString();
};

/**
 * getStatusText - Converts numeric status code to readable text
 *
 * @param status - Numeric status code (0, 1, 2) or string representation
 * @returns Human-readable status text (PENDING, IN_TRANSIT, DELIVERED, or UNKNOWN)
 *
 * Example usage:
 *    <span>Status: {getStatusText(shipment.status)}</span>
 */
export const getStatusText = (status: string | number | undefined): string => {
    if (status === undefined) return "UNKNOWN";

    const statusMap: {[key: string]: string} = {
        "0": "PENDING",
        "1": "IN_TRANSIT",
        "2": "DELIVERED"
    };

    return statusMap[status.toString()] || "UNKNOWN";
};

/**
 * getStatusColor - Gets appropriate color class for a status code
 *
 * @param status - Numeric status code (0, 1, 2) or string representation
 * @returns Tailwind CSS color class for the status (red, yellow, green, or gray)
 *
 * Example usage:
 *    <span className={getStatusColor(shipment.status)}>Status: {getStatusText(shipment.status)}</span>
 */
export const getStatusColor = (status: string | number | undefined): string => {
    if (status === undefined) return "text-gray-500";

    const statusColorMap: {[key: string]: string} = {
        "0": "text-red-500",     // Pending - red
        "1": "text-yellow-500",  // In Transit - yellow
        "2": "text-green-500"    // Delivered - green
    };

    return statusColorMap[status.toString()] || "text-gray-500";
};

/**
 * getServiceName - Converts service ID to human-readable service name
 *
 * @param serviceId - Numeric service identifier (1-8)
 * @returns Service name as string or "Unknown Service" if not found
 *
 * Example usage:
 *    <h2>{getServiceName(selectedService)}</h2>
 */
export const getServiceName = (serviceId: number): string => {
    const serviceNames: {[key: number]: string} = {
        1: "Tokenized Supply Chain Goods",
        2: "Automated Supply Chain Smart Contracts",
        3: "Decentralized Marketplace",
        4: "Supply Chain Data Marketplaces",
        5: "Supply Chain Insurance",
        6: "Cross-Border Payment Solutions",
        7: "Invoice Financing",
        8: "Automated Supply Chain Financing Pools"
    };

    return serviceNames[serviceId] || "Unknown Service";
};

/**
 * getBusinessTypeName - Converts business type ID to readable name
 *
 * @param businessId - Numeric business type identifier (1-4)
 * @returns Business type name as string or "Unknown Business Type" if not found
 *
 * Example usage:
 *    <p>Business Type: {getBusinessTypeName(businessType)}</p>
 */
export const getBusinessTypeName = (businessId: number): string => {
    const businessTypes: {[key: number]: string} = {
        1: "Small and Medium Enterprise (SME)",
        2: "Logistics and Freight Company",
        3: "E-commerce Business",
        4: "Tech Startup"
    };

    return businessTypes[businessId] || "Unknown Business Type";
};

/**
 * formatPrice - Formats price values for consistent display
 *
 * @param price - Price value as string or number
 * @returns Formatted price string with ETH denomination if applicable
 *
 * Example usage:
 *    <p>Price: {formatPrice(service.price)}</p>
 */
export const formatPrice = (price: string | number): string => {
    if (typeof price === 'number') {
        // If it's a large number (wei), convert to ETH
        if (price > 1e10) {
            return `${(price / 1e18).toFixed(6)} ETH`;
        }
        return `${price} ETH`;
    }
    return price.toString();
};

/**
 * STORAGE_KEYS - Constants for local storage key names
 * Used for consistent local storage access across the app
 */
export const STORAGE_KEYS = {
    PURCHASED_SERVICES: 'looptrust_purchased_services'  // Key for storing purchased services
};

/**
 * storePurchasedService - Saves purchased service information to local storage
 *
 * @param serviceId - ID of the purchased service
 * @param planType - Selected plan type (basic, standard, premium)
 * @param businessType - Selected business type ID
 * @returns Boolean indicating success or failure
 *
 * Example usage:
 *    const success = storePurchasedService(selectedService, selectedPlan, businessType);
 */
export const storePurchasedService = (
    serviceId: number,
    planType: string,
    businessType: number
): boolean => {
    try {
        // Get existing services from local storage
        const storedServices = localStorage.getItem(STORAGE_KEYS.PURCHASED_SERVICES);
        const services = storedServices ? JSON.parse(storedServices) : [];

        // Add new service purchase to the array
        services.push({
            serviceId,
            planType,
            businessType,
            purchaseDate: Date.now()  // Record purchase timestamp
        });

        // Store updated list back to local storage
        localStorage.setItem(STORAGE_KEYS.PURCHASED_SERVICES, JSON.stringify(services));

        return true;  // Return success
    } catch (error) {
        console.error("Error storing purchased service:", error);
        return false;  // Return failure
    }
};

/**
 * getPurchasedServices - Retrieves all purchased services from local storage
 *
 * @returns Array of purchased service objects or empty array if none/error
 *
 * Example usage:
 *    const myServices = getPurchasedServices();
 *    myServices.forEach(service => { ... });
 */
export const getPurchasedServices = () => {
    try {
        // Attempt to retrieve and parse stored services
        const storedServices = localStorage.getItem(STORAGE_KEYS.PURCHASED_SERVICES);
        return storedServices ? JSON.parse(storedServices) : [];
    } catch (error) {
        console.error("Error getting purchased services:", error);
        return [];  // Return empty array on error
    }
};