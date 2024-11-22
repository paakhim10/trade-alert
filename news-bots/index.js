import connectDB from "./config/db.js";
import launchBrowser from "./config/browser.js";
import dotenv from "dotenv";
import EconomicTimesScraper from "./scripts/theeconomicstimes.js";
import liveMintScrapper from "./scripts/livemint.js";
import CNBCScraper from "./scripts/cnbc.js";
import HindustantimesScrapper from "./scripts/hindustanTimes.js";
import PulseByZerodhaScrapper from "./scripts/pulseByZerodha.js";
import TheIndianExpressScraper from "./scripts/theIndianExpress.js";
import TheTimesOfIndiaScraper from "./scripts/theTimesOfIndia.js";
import TribuneScrapper from "./scripts/tribune.js";

dotenv.config();
await connectDB();

const scrapeNews = async () => {
  const browser = await launchBrowser();
  console.log("Scraping news...");

  const cnbcScraper = new CNBCScraper(browser);
  await cnbcScraper.scrapeNews();
  const hidustanTimes = new HindustantimesScrapper(browser);
  await hidustanTimes.scrapeNews();
  const liveMint = new liveMintScrapper(browser);
  await liveMint.scrapeNews();
  const pulseByZerodha = new PulseByZerodhaScrapper(browser);
  await pulseByZerodha.scrapeNews();
  const economicTimes = new EconomicTimesScraper(browser);
  await economicTimes.scrapeNews();
  const indianExpress = new TheIndianExpressScraper(browser);
  await indianExpress.scrapeNews();
  const timesOfIndia = new TheTimesOfIndiaScraper(browser);
  await timesOfIndia.scrapeNews();
  const tribune = new TribuneScrapper(browser);
  await tribune.scrapeNews();
  browser.close();
};

scrapeNews();

// scrapNews every hour
setInterval(scrapeNews, 1000 * 60 * 60);
