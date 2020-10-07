const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.PUBLIC_URL = '';
process.env.API_URL = '';

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'build/'),
        filename: 'gpcoders-bundle.js',
        publicPath: '/'
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack', 'url-loader']
            },
            {
                test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(png|ico|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    },
    devtool: '',
    performance: { hints: false },
    plugins: [
        new CleanWebpackPlugin(),
        new Dotenv({
            path: path.join(__dirname, 'config', 'prod.env'),
            safe: true
        }),
        new webpack.DefinePlugin({
            'process.env.API_HOST': JSON.stringify(process.env.API_HOST)
        }),
        new MiniCssExtractPlugin(),
        new BrotliPlugin({
            asset: '[path].br[query]',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new CopyPlugin([
            {
                from: 'public/',
                to: ''
            }
        ])
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src/')
        }
    }
};
