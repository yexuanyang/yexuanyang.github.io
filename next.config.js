/** @type {import('next').NextConfig} */
const repo = "yexuanyang.github.io";
const assetPrefix = `/${repo}/`;
const basePath = `/${repo}`;
const nextConfig = {
    reactStrictMode: true,
    output: "export",
    basePath,
    assetPrefix,
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;