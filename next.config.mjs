/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { dev, isServer }) => {
        // Disable webpack cache
        config.cache = true;
    
        return config;
      },
      images: {
        domains: ['avatar.iran.liara.run','res.cloudinary.com'],
      }
};

export default nextConfig;
