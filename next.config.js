/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        // Will only be available on the server side
        baseUrl: `${process.env.API_BASE_URL}`,
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        baseUrl: `${process.env.API_BASE_URL}`,
        domain: process.env.DOMAIN,
        dlBaseUrl: process.env.DL_BASE_URL,
    },
    images: {
        domains: process.env.IMAGE_DOMAINS.split(','),
    },
    webpack(config) {
        if (process.env.BUILD_DEBUG === '1') {
            config.infrastructureLogging = { debug: /PackFileCache/ };
        }
        return config;
    },
    generateBuildId: async () => {
        // get the latest git commit
        return require('child_process')
            .execSync('git rev-parse HEAD')
            .toString()
            .trim();
    },
};

module.exports = nextConfig;
