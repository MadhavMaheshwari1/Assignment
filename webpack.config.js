const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: './src/scripts/script.js', // Entry point for your application
    output: {
        filename: 'bundle.js', // Output bundle filename
        path: path.resolve(__dirname, 'dist'), // Output directory
        clean: true, // Clean the output directory before each build
    },
    module: {
        rules: [
            {
                test: /\.css$/, // For .css files
                use: ['style-loader', 'css-loader'], // Loaders for CSS
            },
            {
                test: /\.(png|jpg|jpeg|gif|webp)$/i, // For image files
                type: 'asset/resource',
            },
        ],
    },
    optimization: {
        minimize: true, // Enable minimization
        minimizer: [
            `...`, // This preserves the existing JS minimizer
            new CssMinimizerPlugin(), // Add the CSS minimizer
        ],
    },
    mode: 'production', // Set mode to 'production' for minification
};
