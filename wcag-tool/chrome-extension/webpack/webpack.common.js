// eslint-disable-next-line no-unused-vars
const webpack = require('webpack')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

const srcDir = path.join(__dirname, '..', 'src')

module.exports = {
    entry: {
        popup: path.join(srcDir, 'popup.jsx'),
        options: path.join(srcDir, 'options.jsx'),
        background: path.join(srcDir, 'background.js'),
        content_script: path.join(srcDir, 'content_script.jsx'),
    },
    output: {
        path: path.join(__dirname, '../dist/js'),
        filename: '[name].js',
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks(chunk) {
                return chunk.name !== 'background'
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: '.', to: '../', context: 'public' }],
            options: {},
        }),
    ],
}
