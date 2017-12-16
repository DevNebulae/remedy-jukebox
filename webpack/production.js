const base = require("./base")
const merge = require("webpack-merge")
const nodeExternals = require("webpack-node-externals")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

module.exports = merge(base, {
  externals: [nodeExternals()],
  plugins: [new UglifyJsPlugin()]
})
