const puppeteer = require('puppeteer');

(async () => {
    try {
        console.log('Starting Puppeteer...');
        const browser = await puppeteer.launch({
            executablePath: 'C:\\Users\\asian\\.cache\\puppeteer\\chrome\\win64-137.0.7119.0\\chrome-win64\\chrome.exe', // Make sure this path is correct
            headless: true, // Headless mode, can be false to view the browser
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Add sandbox flags
        });
        const page = await browser.newPage();
        await page.goto('https://example.com');
        console.log('Page title:', await page.title());
        await browser.close();
    } catch (err) {
        console.error('Error launching Puppeteer:', err);
    }
})();
