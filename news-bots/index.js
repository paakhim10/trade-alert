import connectDB from "./config/db.js";
import launchBrowser from "./config/browser.js";
import EconomicTimesScraper from "./scripts/theeconomicstimes.js";

// await connectDB();
const browser = await launchBrowser();

const scrapeNews = async () => {
  const economicTimesScraper = new EconomicTimesScraper(browser);
  await economicTimesScraper.scrapeNews();
};

scrapeNews();

// scrapNews every hour
setInterval(scrapeNews, 1000 * 60 * 60);
