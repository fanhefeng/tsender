"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from "react-icons/fa";

export default function Header() {
	return (
		<header className="flex items-center justify-between p-4 bg-white shadow-md fixed top-0 w-full z-50">
			{/* Left side - Title */}
			<div className="flex items-center">
				<h1 className="text-2xl font-bold text-blue-600 mr-2">TSender</h1>
			</div>

			{/* Right side - Wallet + GitHub */}
			<div className="flex items-center gap-4">
				<a
					href="https://github.com/fanhefeng/tsender"
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-600 hover:text-gray-800 transition-colors"
				>
					<FaGithub size={24} />
				</a>
				<ConnectButton accountStatus="address" chainStatus="icon" showBalance={false} />
			</div>
		</header>
	);
}
