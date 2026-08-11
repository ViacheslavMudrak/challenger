/**
 * @param {import('next').NextConfig} nextConfig
 */
const componentPropsPlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }
      return config;
    },
  });
};

module.exports = componentPropsPlugin;