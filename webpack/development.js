const StartServerPlugin = require("start-server-webpack-plugin")
const base = require("./base")
const merge = require("webpack-merge")
const nodeExternals = require("webpack-node-externals")
const webpack = require("webpack")

module.exports = merge(base, {
  entry: ["webpack/hot/poll?1000"],
  externals: [
    nodeExternals({
      whitelist: ["webpack/hot/poll?1000"]
    })
  ],
  plugins: [
    new StartServerPlugin("server.js"),
    new webpack.HotModuleReplacementPlugin()
  ],
  watch: true
})
