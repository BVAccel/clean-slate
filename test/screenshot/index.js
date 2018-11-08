const puppeteer = require('puppeteer');

const takeScreenshot = async () => {
  try {
    const {
      BUDDY_PIPELINE_TARGET_SITE_URL: url,
      BUDDY_EXECUTION_BRANCH: branch,
      BUDDY_EXECUTION_ID: id,
    } = process.env;
    console.log(`url is: ${url}`);
    console.log(`branch is: ${branch}`);
    console.log(`id is: ${id}`);

    const path = `./test/screenshot/images/${branch}/${id}.png`
    console.log(`path is: ${path}`);

    if (!url) {
      console.log(`No target site url attached to pipeline.`);

      return false;
    }

    console.log(`opening browser.`);
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});

    console.log(`creating new page.`);
    const page = await browser.newPage();

    console.log(`goign to ${url}.`);
    await page.goto(url);

    console.log(`taking screenshot to ${path}.`);
    await page.screenshot({ path });

    console.log(`closing browser.`);
    await browser.close();

    console.log(`returning 0;`);
    return;
  } catch (error) {
    console.log(error);

    return false;
  }
};

module.exports = takeScreenshot;
