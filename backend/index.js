import { app, port } from './server.js'

app.listen(port, () => {
  console.log(`Mental app backend listening on port ${port}`)
})