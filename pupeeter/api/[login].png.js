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

    const [page] = await browser.pages();
    await page.goto(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${req.query.login}/badge`
    );
    await page.waitForSelector('#badge[data-qa="loaded"]', {
      timeout: 10000,
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

    console.error(error);

    res.status(500).end();
  }
}
