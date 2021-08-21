const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.config.js");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  entry: {
    app: "./example/src/app.tsx",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    // libraryTarget: 'commonjs2'
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    open: true,
    port: 9000,
    compress: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "example/src/index.html",
      inject: "body",
      hash: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
