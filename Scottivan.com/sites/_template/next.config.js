/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
	transpilePackages: ["@scottivan/shared"],
};
module.exports = nextConfig;
