/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { dev, isServer }) => {
        // Disable webpack cache
        config.cache = false;
    
        return config;
      },
};

export default nextConfig;
