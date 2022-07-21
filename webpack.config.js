const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let mode = "development";

if (process.env.NODE_ENV === "production") {
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
         },
         {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
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