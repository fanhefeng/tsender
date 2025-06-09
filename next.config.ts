import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	output: "export",
	images: {
		unoptimized: true,
	},
	distDir: "out",
	basePath: process.env.BASE_PATH || "",
	trailingSlash: true,
	assetPrefix: "./",
};

export default nextConfig;
