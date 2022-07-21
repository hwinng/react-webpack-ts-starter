import path from "path"

import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server"
import { Configuration as WebpackConfiguration } from "webpack"

import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import ESLintPlugin from "eslint-webpack-plugin"

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration
}

enum EDeployEnv {
  DEVELOPMENT = "development",
  PRODUCTION = "production"
}

let mode: EDeployEnv = EDeployEnv.DEVELOPMENT
let target = "web"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const plugins: any[] = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: "./src/index.html"
  }),
  new ForkTsCheckerWebpackPlugin({
    async: false
  }),
  new ESLintPlugin({
    extensions: ["js", "jsx", "ts", "tsx"]
  })
]

if (process.env.NODE_ENV === "production") {
  mode = EDeployEnv.PRODUCTION
  target = "browserslist"
}

if (process.env.SERVE) {
  // We only want React Hot Reloading in serve mode
  plugins.push(new ReactRefreshWebpackPlugin())
}

const config: Configuration = {
  mode: mode,
  target: target,
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.[contenthash:6].js",
    path: path.resolve(__dirname, "build"),
    assetModuleFilename: "image/[hash][ext][query]"
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/[hash][ext][query]"
        }
      },
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript"
            ],
            plugins: [
              mode === EDeployEnv.DEVELOPMENT &&
                require.resolve("react-refresh/babel")
            ].filter(Boolean)
          }
        }
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // required for asset import in CSS such as url()
            options: { publicPath: "" }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: mode === EDeployEnv.DEVELOPMENT ? true : false
            }
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: mode === EDeployEnv.DEVELOPMENT ? true : false
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name:
                mode === EDeployEnv.DEVELOPMENT
                  ? "[path][name].[ext]"
                  : "static/fonts/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  devtool: mode === EDeployEnv.DEVELOPMENT ? "inline-source-map" : false,
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: {
      "@": path.resolve("src"),
      "@@": path.resolve()
    }
  },
  plugins: plugins,
  devServer: {
    static: path.join(__dirname, "build"),
    historyApiFallback: true,
    open: true,
    port: 4000,
    hot: true
  }
}

export default config
