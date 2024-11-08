/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.js$/, // Match all .js files
            include: /node_modules\/undici/, // Only include files from the undici library
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'], // Enable ES6+ and React support
                },
            },
        });

        return config;
    },
};

module.exports = nextConfig;