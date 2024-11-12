import puppeteer from "puppeteer";

const launchBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: [
      "--start-maximized",
      "--no-sandbox", // Disables sandboxing; useful for environments like Docker
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage", // Avoids using /dev/shm for shared memory, prevents out-of-memory issues
      "--disable-gpu", // Disable GPU for environments without a GPU; often unnecessary for scraping
      "--no-zygote", // Helps reduce memory consumption
      "--single-process", // Runs browser as a single process (saves memory but may impact stability)
      "--disable-background-timer-throttling", // Keeps timers running at a normal rate
      "--disable-backgrounding-occluded-windows", // Prevents background windows from throttling
      "--disable-renderer-backgrounding", // Prevents throttling of renderer processes
      "--disable-ipc-flooding-protection", // Increases performance for fast data scraping
      "--disable-background-networking", // Reduces unnecessary networking
      "--disable-software-rasterizer", // Uses hardware rasterizer when possible
      "--disable-extensions", // Prevents extensions from loading
      "--disable-features=IsolateOrigins,site-per-process", // Speeds up cross-origin navigation
      "--mute-audio", // Mutes audio to save resources if any media autoplays
      "--disable-notifications", // Blocks site notifications
    ],
  });
  return browser;
};

export default launchBrowser;
