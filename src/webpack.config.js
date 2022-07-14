let mode = "development";

if (process.env.NODE_ENV === "production") {
    console.log(mode)
    mode = "production";
}

module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(j|t)s$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    devTool: "source-map",
    devServer: {
        static: "./dist"
    }
}