const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({executablePath: '/usr/bin/chromium'});
  const page    = await browser.newPage();
  await page.goto('https://www.youtube.com/channel/UCRFNZscT4jafajdzzkuHYvQ/live');

  // Get URL of chat
  var url = await page.$eval('#chatframe', e => e.src);

  // Got to chat page
  await page.goto(url);

  var messages = await page.$eval('yt-live-chat-text-message-renderer', e => e.innerHTML);

  console.log(messages);

  await browser.close();
})();
