import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const outputDir = new URL('../screenshots/', import.meta.url)
mkdirSync(fileURLToPath(outputDir), { recursive: true })

const browser = await chromium.launch()
const cases = [
  ['desktop', { width: 1440, height: 1100 }],
  ['mobile', { width: 390, height: 900 }],
]

for (const [name, viewport] of cases) {
  const page = await browser.newPage({ viewport })
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' })
  await page.screenshot({
    path: fileURLToPath(new URL(`${name}.png`, outputDir)),
    fullPage: true,
  })

  await page.locator('[aria-label="Interactive 3D architectural massing model"]').scrollIntoViewIfNeeded()
  await page.waitForTimeout(800)

  const canvasCheck = await page.evaluate(() => {
    const canvas = document.querySelector('canvas')

    if (!(canvas instanceof HTMLCanvasElement)) {
      return { ok: false, reason: 'missing canvas' }
    }

    const gl =
      canvas.getContext('webgl2', { preserveDrawingBuffer: true }) ??
      canvas.getContext('webgl', { preserveDrawingBuffer: true })

    if (!gl) {
      return { ok: false, reason: 'missing webgl context' }
    }

    const samples = []
    const points = [
      [0.25, 0.25],
      [0.5, 0.5],
      [0.75, 0.75],
      [0.35, 0.65],
      [0.65, 0.35],
    ]

    for (const [x, y] of points) {
      const pixel = new Uint8Array(4)
      gl.readPixels(
        Math.floor(canvas.width * x),
        Math.floor(canvas.height * y),
        1,
        1,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        pixel,
      )
      samples.push([...pixel])
    }

    const unique = new Set(samples.map((sample) => sample.join(','))).size
    const visible = samples.some(([r, g, b, a]) => a > 0 && r + g + b > 30)

    return {
      ok: visible && unique > 1 && canvas.width > 0 && canvas.height > 0,
      canvas: { width: canvas.width, height: canvas.height },
      samples,
      unique,
      visible,
    }
  })

  if (!canvasCheck.ok) {
    throw new Error(`${name} canvas check failed: ${JSON.stringify(canvasCheck)}`)
  }

  await page.close()
}

await browser.close()
console.log('Preview screenshots and WebGL canvas checks passed.')
