import { type ReactNode } from "react";
import type { Metadata } from "next";
import { Providers } from "./providers";
import Header from "../components/Header";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
	title: "TSender",
	description: "AI | Full Stack Blockchain Tutorial",
};

export default function RootLayout(props: { children: ReactNode }) {
	console.log("layout.tsx");
	return (
		<html lang="en">
			<body>
				<Providers>
					<Header />
					{props.children}
				</Providers>
			</body>
		</html>
	);
}
