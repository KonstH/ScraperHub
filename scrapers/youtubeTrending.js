const puppeteer = require('puppeteer');

(getYT = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.youtube.com/feed/trending');

  // Scroll to bottom of page to load all lazy-loaded images
  // Todo: Find better solution to optimize load times
  await autoScroll(page);

  // Get all trending videos and store in vector
  const trendingVideos = await page.evaluate(() => 
    Array.from(document.querySelectorAll('ytd-video-renderer'))
    .map((node, index) => ({
      key: index + 1,
      title : node.querySelector('a#video-title').innerText,
      src : node.querySelector('a#video-title').href,
      img : node.querySelector('.ytd-thumbnail img').currentSrc
    }))
  );

  await browser.close();
  return trendingVideos;
})();

// Scrolls to the bottom of the webpage
async function autoScroll(page) {
  const distance = 500;
  const delay = 200;
  while (await page.evaluate(() => document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight)) {
    await page.evaluate((y) => { document.scrollingElement.scrollBy(0, y); }, distance);
    await page.waitFor(delay);
  }
}

exports.getYT = getYT;
