import withMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    // npm run build exports static site to /out if this enabled
    output: 'export',
};

export default withMDX()(nextConfig);
