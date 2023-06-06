const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false };

        return config;
    },
    plugins: [
        new NodePolyfillPlugin()
    ]
};