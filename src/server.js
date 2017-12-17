import compression from "compression"
import express from "express"
import fs from "fs"
import path from "path"

const createApp = async () => {
  const app = express()

  if (process.env.NODE_ENV !== "development") {
    app.use(compression())
  }

  app.get("/cdn", (request, response) => {
    const { id, type } = request.query
    // TODO: add location of audio files in config file or
    // environment variables.
    const file = path.join(process.cwd(), `/files/${id}.${type}`)

    /**
     * The `statSync` function has explicitly not been used
     * to prevent blocking of the event loop.
     */
    fs.stat(file, (error, stats) => {
      if (error && error.code === "ENOENT")
        return response
          .status(404)
          .end("The audio identifier could not be resolved.")

      const { range } = request.headers

      /**
       * The 416 HTTP status code indicates that the
       * requestee sent a range which is not applicable to
       * the media requested. An example for this can be a
       * range which starts below 0 or ends with a number
       * greater than the amount of bytes contained within
       * the media file.
       *
       * In this case, if there is no range header
       * specified, throw an error.
       */
      if (!range) return response.sendStatus(416)

      /**
       * The string provided with the "Content-Range" header
       * is as follows: "bytes=[start]-[end]". To extract
       * the start and end bytes. When done extracting these
       * variables, parse them as integers and calculate the
       * size of the chunk. Because the start and end are
       * indexes, add 1 to the difference between the two.
       */
      const positions = range.replace(/bytes=/, "").split("-")
      const total = stats.size
      const start = parseInt(positions[0], 10)
      const end = positions[1] ? parseInt(positions[1], 10) : total - 1
      const chunkSize = end - start + 1

      response.writeHead(206, {
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Range": `bytes ${start}-${end}/${total}`,
        "Content-Type": `audio/${type}`
      })

      const stream = fs
        .createReadStream(file, { start, end })
        .on("open", () => {
          stream.pipe(response)
        })
        .on("error", () => {
          response.status(500).end("Stream ended.")
        })
    })
  })

  return app
}

export default createApp
