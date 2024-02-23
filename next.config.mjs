/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { dev, isServer }) => {
        // Disable webpack cache
        config.cache = false;
    
        return config;
      },
      images: {
        domains: ['avatar.iran.liara.run'],
      }
};

export default nextConfig;
