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

  await page.locator('#partner').scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)

  const pageCheck = await page.evaluate(() => {
    const hero = document.querySelector('video')
    const images = [...document.querySelectorAll('img')]
    const horizontalOverflow = document.documentElement.scrollWidth > window.innerWidth + 1

    return {
      ok:
        hero instanceof HTMLVideoElement &&
        images.length >= 5 &&
        !horizontalOverflow,
      heroPresent: hero instanceof HTMLVideoElement,
      imageCount: images.length,
      horizontalOverflow,
    }
  })

  if (!pageCheck.ok) {
    throw new Error(`${name} page check failed: ${JSON.stringify(pageCheck)}`)
  }

  await page.close()
}

await browser.close()
console.log('Preview screenshots and responsive page checks passed.')
