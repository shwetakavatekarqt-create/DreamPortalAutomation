const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://arjitnigam.github.io/myDreams/index.html');
  await page.waitForSelector('#dreamButton', { timeout: 15000 });

  const [page1, page2] = await Promise.all([
    context.waitForEvent('page'),
    context.waitForEvent('page'),
    page.click('#dreamButton'),
  ]);

  const pages = context.pages();
  console.log('pages count:', pages.length);
  console.log('urls:', pages.map((p) => p.url()));

  await browser.close();
})();
