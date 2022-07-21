const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ENV = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production'
};

let mode = ENV.DEVELOPMENT;
let target = "web";
let plugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
        template: "./src/index.html"
    })
];

if (process.env.NODE_ENV === "production") {
    mode = "production";
    target = "browserslist"
}

if (process.env.SERVE) {
    // We only want React Hot Reloading in serve mode
    plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
    mode: mode,
    target: target,
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.[contenthash:6].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'image/[hash][ext][query]'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|svg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/[hash][ext][query]'
                }
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            },
            {
                test: /\.(s[ac]ss|css)$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // required for asset import in CSS such as url()
                        options: { publicPath: "" },
                    },
                    {
                        loader: "css-loader",
                        options: { sourceMap: mode === ENV.DEVELOPMENT ? true : false }
                    },
                    "postcss-loader",
                    {
                        loader: "sass-loader",
                        options: { sourceMap: mode === ENV.DEVELOPMENT ? true : false }
                    },
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: mode === ENV.DEVELOPMENT ? "[path][name].[ext]" : "static/fonts/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    devtool: mode === ENV.DEVELOPMENT ? 'inline-source-map' : false,
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        alias: {
            "@": path.resolve("src"),
            "@@": path.resolve()
        }
    },
    plugins: plugins,
    devServer: {
        static: "./dist",
        hot: true
    },
}