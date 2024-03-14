/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { dev, isServer }) => {
        // Disable webpack cache
        config.cache = true;
    
        return config;
      },
      images: {
        domains: ['avatar.iran.liara.run','res.cloudinary.com'],
      },
      env:{
        // API:"http://localhost:8000"
        API:"https://popcorn-woad.vercel.app"
      }
};

export default nextConfig;
