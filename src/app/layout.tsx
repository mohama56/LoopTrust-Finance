import "./globals.css";
import { Inter } from "next/font/google"; // custom fonts
import { ThirdwebProvider } from "thirdweb/react";
import { ethereum } from "thirdweb/chains";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "LoopTrust Finance",
    description: "Secure and transparent DeFi transactions",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ThirdwebProvider
            // @ts-ignore
            clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || ""}
            activeChain={ethereum}
        >
            {children}
        </ThirdwebProvider>
        </body>
        </html>
    );
}