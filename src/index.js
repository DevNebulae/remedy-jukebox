import createApp from "./server"
import http from "http"

const start = async () => {
  let currentApp = await createApp()
  const server = http.createServer(currentApp)
  server.listen(4921)

  if (module.hot) {
    module.hot.accept(["./server"], async () => {
      server.removeListener("request", currentApp)
      currentApp = await createApp()
      server.on("request", currentApp)
    })
  }
}
