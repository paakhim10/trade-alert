import puppeteer from "puppeteer";
import fs from "fs/promises";
import { TheEconomicsTimes } from "./news.model.js";
import connectDB from "./db.js";

const getFullArticle = async (page, href) => {
  await page.goto(href, {
    waitUntil: "networkidle2",
  });

  const newsArticle = await page.evaluate(() => {
    const article = {};
    article.title = document.querySelector("h1.artTitle")?.innerText;
    article.content = document.querySelector("div.artText")?.innerText;
    return article;
  });

  newsArticle.link = href;

  return newsArticle;
};

const scrapeNews = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
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

    let newsStorage;
    try {
      const data = await fs.readFile("store.json", "utf-8");
      newsStorage = JSON.parse(data);
    } catch (error) {
      newsStorage = [];
    }

    const newHrefs = hrefs.slice(0, 10).filter((href) => {
      return !newsStorage.some((news) => news.href === href);
    });
    console.log(newHrefs);

    newHrefs.forEach((href) => {
      newsStorage.unshift({ href });
    });

    // Ensure newsStorage only has 10 items (the most recent ones)
    newsStorage = newsStorage.slice(0, 10);

    for (const news of newHrefs) {
      const article = await getFullArticle(page, news);
      const newsArticle = await TheEconomicsTimes.create({
        title: article.title,
        link: article.link,
        content: article.content,
      });
      console.log("News Article:", newsArticle);
    }
    await fs.writeFile("store.json", JSON.stringify(newsStorage, null, 2));
    await browser.close();
  } catch (error) {
    console.error("Error scraping data:", error);
  }
};

// Run immediately once
await connectDB();
scrapeNews();

// Run every 15 minutes (15 * 60 * 1000 milliseconds)
setInterval(scrapeNews, 60 * 60 * 1000);
