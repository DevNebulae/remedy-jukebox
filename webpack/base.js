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
        test: /\.js?$/,
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
    new CleanWebpackPlugin([dist]),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  target: "node"
}
