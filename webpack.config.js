const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = "development";
let target = "web";

if (process.env.NODE_ENV === "production") {
    mode = "production";
    target = "browserslist"
}

module.exports = {
    mode: mode,
    target: "target",
    module: {
        rules: [
            {
                test: /\.(j|t)s$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.s?css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
            }
        ]
    },
    devtool: "source-map",
    devServer: {
        static: "./dist",
        hot: true
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
}