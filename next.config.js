/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    unoptimized: false,
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  eslint: {
    dirs: ['app', 'components', 'lib', 'modules'],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'SIMS',
    NEXT_PUBLIC_APP_DESCRIPTION: 'Sistem Informasi Manajemen Sekolah',
  },
};

module.exports = nextConfig;
