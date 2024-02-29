/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        OMDB_URL: process.env.OMDB_URL || '$(OMDB_URL)',
        OMDB_API_KEY: process.env.OMDB_API_KEY || '$(OMDB_API_KEY)',
    },
};

export default nextConfig;
