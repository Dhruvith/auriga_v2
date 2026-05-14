import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), 'dist')
const port = 3000

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
}

const server = createServer((request, response) => {
  const url = new URL(request.url ?? '/', `http://${request.headers.host}`)
  const decodedPath = decodeURIComponent(url.pathname)
  const requestedPath = normalize(join(root, decodedPath))
  const safePath = requestedPath.startsWith(root) ? requestedPath : root
  const filePath =
    existsSync(safePath) && statSync(safePath).isFile()
      ? safePath
      : join(root, 'index.html')

  response.setHeader(
    'Content-Type',
    contentTypes[extname(filePath)] ?? 'application/octet-stream',
  )
  createReadStream(filePath).pipe(response)
})

server.listen(port, '127.0.0.1', () => {
  console.log(`Auriga Homes preview: http://127.0.0.1:${port}/`)
})

setInterval(() => undefined, 60_000)
