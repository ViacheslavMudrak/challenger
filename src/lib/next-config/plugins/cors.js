/**
 * @param {import('next').NextConfig} nextConfig
 * https://byteium.com/2023/09/cors-issue-for-fonts-in-xm-cloud-local-experience-editor
 */
const cors = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    async headers() {
      return [
        {
          // matching all API routes
          source: '/_next/:path*',
          headers: [
            { key: 'Access-Control-Allow-Credentials', value: 'true' },
            { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
            { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
            {
              key: 'Access-Control-Allow-Headers',
              value:
                'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
            },
          ],
        },
      ];
    },
  });
};

module.exports = cors;
