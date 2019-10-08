const dev = process.env.NODE_ENV !== "production";
const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const plugins = [
  new FriendlyErrorsWebpackPlugin()
];

if (!dev) {
  plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: "static",
    reportFilename: "webpack-report.html",
    openAnalyzer: false,
  }));
}

module.exports = {
  mode: dev ? "development" : "production",
  context: path.join(__dirname, "../client"),
  devtool: dev ? "none" : "source-map",
  entry: {
    client: "./index.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
      }
    ],
  },
  output: {
    path: path.resolve(__dirname, "../public/"),
    filename: "[name].js",
    globalObject: "this"
  },
  plugins
};
