import { createThirdwebClient } from "thirdweb";
import { ethereum } from "thirdweb/chains";

// Get the client ID from environment variables
const clientId: string | undefined = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!clientId) {
  throw new Error("No client ID provided");
}

// Create and export the thirdweb client
export const client = createThirdwebClient({
  clientId,
});