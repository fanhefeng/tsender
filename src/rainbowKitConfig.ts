"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, zksync } from "wagmi/chains";

if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) throw new Error("You need to provide NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable");

const config = getDefaultConfig({
	appName: "TSender",
	chains: [zksync, mainnet],
	projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
	ssr: false,
});
export { config };
