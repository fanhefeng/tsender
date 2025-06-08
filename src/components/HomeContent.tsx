"use client";

import AirdropForm from "@/components/AirdropForm";
import { useAccount } from "wagmi";
export default function HomeContent() {
	const { isConnected } = useAccount();
	console.log(isConnected);
	return (
		<main className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4">
			<h1 className="text-4xl font-bold mb-8">Welcome to the Airdrop</h1>
			{isConnected ? (
				<AirdropForm />
			) : (
				<div className="text-lg">This is a simple airdrop website. You can claim your airdrop by connecting your wallet.</div>
			)}
		</main>
	);
}
