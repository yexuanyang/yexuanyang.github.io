/** @type {import('next').NextConfig} */
const repo = 'yexuanyang.github.io';
const assetPrefix = `/${repo}/`;
const basePath = `/${repo}`;

const nextConfig = {
    basePath,
    assetPrefix,
    output: "export",
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;