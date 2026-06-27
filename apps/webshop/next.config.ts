import { composePlugins, withNx } from '@nx/next';
import type { NextConfig } from 'next';
import type { WithNxOptions } from '@nx/next/plugins/with-nx';

const nextConfig: WithNxOptions & NextConfig = {
  nx: {},
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
};

const plugins = [withNx];

const config = composePlugins(...plugins)(nextConfig);

export default config;
