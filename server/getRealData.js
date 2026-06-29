const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');
  await page.goto('https://www.imdb.com/chart/boxoffice/', { waitUntil: 'networkidle2' });
  await page.waitForSelector('#__NEXT_DATA__', { timeout: 15000 });
  await new Promise(resolve => setTimeout(resolve, 3000));

  const data = await page.evaluate(() => {
    try {
      const scriptTag = document.querySelector('#__NEXT_DATA__');
      if (scriptTag) {
        return scriptTag.innerHTML;
      }
      return null;
    } catch (e) {
      return null;
    }
  });

  fs.writeFileSync('next_data.json', data || 'null');
  await browser.close();
})();
