/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'localhost' },
            { hostname: 'res.cloudinary.com' },
            { hostname: 'www.drupal.org' },
            { hostname: 'cdn.sanity.io' },
        ],
    },
}

module.exports = nextConfig
