
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function renderHTMLToFrames(url) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });

  const framesDir = path.join(__dirname, 'output', 'frames');
  fs.mkdirSync(framesDir, { recursive: true });

  for (let i = 0; i < 150; i++) {
    await page.screenshot({ path: path.join(framesDir, `frame${String(i).padStart(4, '0')}.png`) });
    await page.evaluate(() => window.scrollBy(0, 5));
  }

  await browser.close();
  return framesDir;
}

module.exports = { renderHTMLToFrames };
