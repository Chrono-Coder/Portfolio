/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'res.cloudinary.com', "www.drupal.org", "cdn.sanity.io"],
    }
}

module.exports = nextConfig
