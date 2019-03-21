const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const json = require("json-loader!./file.json");

module.exports = {
  entry: [
    "core-js/modules/es6.promise",
    "core-js/modules/es6.array.iterator",
    "./src/index.js"
  ],
  mode: "development",
  module: {
    rules: [
      {
        //Load JS and JSX
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        //Load CSS
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        //Load Images
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ["file-loader?name=[name].[ext]"] // ?name=[name].[ext] is only necessary to preserve the original file name
      },
      {
        //Json loader
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  },
  resolve: {
    mainFields: ["browser", "main", "module"],
    extensions: ["*", ".js", ".json", ".jsx"]
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 7000,
    publicPath: "http://localhost:7000/dist/",
    hotOnly: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
