const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let mode = "development";
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
            // {
            //     test: /\.jsx?$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: "babel-loader",
            //         options: {
            //             // to avoid potential expensive babel recompilation process on each run
            //             cacheDirectory: true
            //         }
            //     }
            // },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // required for asset import in CSS such as url()
                        options: { publicPath: "" },
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    devtool: "inline-source-map",
    resolve: {
        extensions: ['.ts', 'tsx', '.js']
    },
    plugins: plugins,
    devServer: {
        static: "./dist",
        hot: true
    },
}