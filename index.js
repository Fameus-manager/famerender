const express = require('express');
const puppeteer = require('puppeteer');
const { renderHTMLToFrames } = require('./renderer');
const { mergeWithAudio } = require('./ffmpeg');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());

// Use the Linux Chrome path if on Linux, otherwise use the Windows path.
const chromePath = process.platform === 'linux'
    ? '/opt/render/.cache/puppeteer/chrome-linux/chrome'
    : 'C:\\Users\\asian\\.cache\\puppeteer\\chrome\\win64-135.0.7049.84\\chrome-win64\\chrome.exe';

app.post('/render', async (req, res) => {
    const { htmlUrl, audioPath, outputName } = req.body;
    try {
        console.log(`Starting render for HTML from: ${htmlUrl}`);

        const browser = await puppeteer.launch({
            executablePath: chromePath,
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();
        await page.goto(htmlUrl);

        const framesDir = await renderHTMLToFrames(page);
        console.log(`Frames saved to: ${framesDir}`);

        console.log(`Merging frames with audio: ${audioPath}`);
        const videoPath = await mergeWithAudio(framesDir, audioPath, outputName);
        console.log(`Render successful, video saved at: ${videoPath}`);

        await browser.close();

        res.json({ success: true, videoPath });
    } catch (err) {
        console.error('Error during render:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`FameRender live on port ${PORT}`);
});
