import connectDB from "./config/db.js";
import launchBrowser from "./config/browser.js";
import EconomicTimesScraper from "./scripts/theeconomicstimes.js";
import liveMintScrapper from "./scripts/livemint.js";
import dotenv from "dotenv";

dotenv.config();
await connectDB();

const scrapeNews = async () => {
  const browser = await launchBrowser();
  console.log("Scraping news...");
  const economicTimesScraper = new EconomicTimesScraper(browser);
  await economicTimesScraper.scrapeNews();
  const liveMintScraper = new liveMintScrapper(browser);
  await liveMintScraper.scrapeNews();
  browser.close();
};

scrapeNews();

// scrapNews every hour
setInterval(scrapeNews, 1000 * 60 * 60);
