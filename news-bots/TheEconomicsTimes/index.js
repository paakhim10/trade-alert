import puppeteer from "puppeteer";
import { News } from "./news.model.js";
import { newsStorage } from "./store.js";

const scrapeNews = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });
    const page = await browser.newPage();

    // Go to the target URL
    await page.goto(
      "https://economictimes.indiatimes.com/markets/stocks/news",
      {
        waitUntil: "networkidle2",
      }
    );

    // Extract the hrefs
    const hrefs = await page.evaluate(() => {
      const storyElements = document.querySelectorAll("div.eachStory h3 a");
      return Array.from(storyElements).map((link) => link.href);
    });

    console.log("Extracted links:", hrefs);

    await browser.close();
  } catch (error) {
    console.error("Error scraping data:", error);
  }
};

// Run immediately once
scrapeNews();

// Run every 15 minutes (15 * 60 * 1000 milliseconds)
setInterval(scrapeNews, 15 * 60 * 1000);
