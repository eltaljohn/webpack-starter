const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizer = require("css-minimizer-webpack-plugin");
const Terser = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  output: {
    clean: true,
    filename: "main.[contenthash].js",
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizer(), new Terser()],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          minimize: false,
          sources: false,
        },
      },
      {
        test: /\.css$/i,
        exclude: /styles.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /styles.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[fullhash].css",
      ignoreOrder: true,
    }),
    new CopyPlugin({
      patterns: [{ from: "src/assets/", to: "assets/" }],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
  },
};
