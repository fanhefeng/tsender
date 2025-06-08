"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum, base, mainnet, optimism, anvil, zksync, sepolia } from "wagmi/chains";

// 确保环境变量已正确设置
if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
	throw new Error("You need to provide NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable");
}
export default getDefaultConfig({
	appName: "TSender",
	projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
	chains: [mainnet, optimism, arbitrum, base, zksync, sepolia, anvil],
	ssr: false,
});
