/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // 在客户端构建时不包含这些模块
            config.resolve.fallback = {
                fs: false,
                path: false
            };
        }
        return config;
    }
};

module.exports = nextConfig; 