/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
            domains: ['images.app.goo.gl'],
                    unoptimized: true,
                        },
                            webpack: (config, { isServer }) => {
                                    config.module.rules.push({
                                                test: /\.js$/, // Match .js files
                                                            exclude: /node_modules/, // Exclude files in node_modules
                                                                        use: {
                                                                                        loader: 'babel-loader', // Use babel-loader to transpile JS files
                                                                                                        options: {
                                                                                                                            presets: ['@babel/preset-env', '@babel/preset-react'], // Enable ES6+ and React support
                                                                                                                                            },
                                                                                                                                                        },
                                                                                                                                                                });
                                                                                                                                                                
                                                                                                                                                                        return config;
                                                                                                                                                                            },
                                                                                                                                                                            };
                                                                                                                                                                            
                                                                                                                                                                            module.exports = nextConfig; 
                                