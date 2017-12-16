const CleanWebpackPlugin = require("clean-webpack-plugin")
const path = require("path")
const webpack = require("webpack")

const dist = path.resolve(process.cwd(), "dist/")
const src = path.resolve(process.cwd(), "src/")

module.exports = {
  entry: [path.resolve(src, "index")],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  output: {
    path: dist,
    filename: "server.js"
  },
  plugins: [
    new CleanWebpackPlugin([dist], { root: process.cwd() }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  target: "node"
}
