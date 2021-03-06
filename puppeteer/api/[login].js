const chromium = require("chrome-aws-lambda");

export default async function (req, res) {
  let browser;
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
    });

    await chromium.font(
      "https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf"
    );
    const [page] = await browser.pages();
    await page.goto(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${req.query.login}/badge`
    );
    await page.waitForSelector('#badge[data-qa="loaded"]', {
      timeout: 5000,
    });
    const element = await page.$("#badge");
    const screenshot = await element.screenshot({
      type: "png",
    });
    await browser.close();
    res.statusCode = 200;
    res.setHeader("content-type", "image/png");
    res.setHeader(
      "cache-control",
      `public, max-age=${process.env.CACHE_IN_SECONDS}, immutable`
    );
    res.end(screenshot);
  } catch (error) {
    try {
      await browser.close();
    } catch (_) {}

    console.error(
      error,
      `${process.env.NEXT_PUBLIC_BASE_URL}/${req.query.login}/badge`
    );

    res.status(500).end();
  }
}
