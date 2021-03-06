const chromium = require("chrome-aws-lambda");
const { readFileSync } = require("fs");
const { join } = require("path");

const backupImage = readFileSync(join(__dirname, "social.png"));

export default async function (req, res) {
  let browser;
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
    });

    await chromium.font(`${process.env.BASE_URL}/inter.ttf`);
    await chromium.font(`${process.env.BASE_URL}/noto.ttf`);
    const [page] = await browser.pages();
    await page.goto(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${req.query.login}/badge`,
      { timeout: 15000 }
    );
    await page.waitForSelector('#badge[data-qa="loaded"]', {
      timeout: 15000,
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
      `public, max-age=${process.env.CACHE_IN_SECONDS}, s-maxage=60, stale-while-revalidate`
    );
    res.end(screenshot);
  } catch (error) {
    try {
      await browser.close();
    } catch (_) {}

    console.error(error);

    res.statusCode = 200;
    res.setHeader("content-type", "image/png");
    res.setHeader(
      "cache-control",
      "public, max-age=600, s-maxage=60, stale-while-revalidate"
    );
    res.end(backupImage);
  }
}
