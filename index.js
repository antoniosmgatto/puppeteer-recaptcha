require("dotenv").config();

const puppeteer = require("puppeteer-extra");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: "2captcha",
      token: process.env.API_2CAPTCHA_TOKEN
    },
    visualFeedback: true
  })
)
const { executablePath } = require("puppeteer");

const browserOptions = {
  headless: false,
  executablePath: executablePath()
};

(async () => {
  const browser = await puppeteer.launch(browserOptions)
  const page = await browser.newPage()
  await page.goto("https://www.google.com/recaptcha/api2/demo")
  await page.solveRecaptchas();
  await Promise.all([
    page.waitForNavigation(),
    page.click("#recaptcha-demo-submit")
  ])
  await page.screenshot({ path: "response.png", fullPage: true });
  await browser.close();
})();
