switch (process.env.NODE_ENV) {
  case "dev":
  case "development":
    module.exports = require("./webpack/development")
    break
  case "prod":
  case "production":
    module.exports = require("./webpack/production")
    break
}
