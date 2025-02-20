/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "export",
    images: {
        unoptimized: true,
    },
    basePath: "/yyxblog",
    assetPrefix: "/yyxblog",
};

module.exports = nextConfig;