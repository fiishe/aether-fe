// Entry point for game server

import express from 'express'
import fs from 'fs' // file system (node lib)
import path from 'path'

const app = express()

// this script is run from the root directory
const __dirname = "./app/game/server"

app.get('/maps', (req, res) => {
  console.log(`Started GET "/maps"`)
  console.log(path.resolve(__dirname, "maps.json"));

  fs.readFile(
    path.resolve(__dirname, "maps.json"),
    'UTF-8',
    (error, data) => {
      console.log(data)
      res.send(data)
    }
  )
})

const server = app.listen(8081, () => {
  let host = server.address().address
  let port = server.address().port

  if (host == '::') { host = 'localhost' }
  console.log(`Game app listening at http://${host}:${port}`)
})
