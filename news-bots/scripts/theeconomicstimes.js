import fs from "fs/promises";
import { TheEconomicsTimes } from "../models/news-bots.model.js";
import path from "path";

class EconomicTimesScraper {
  constructor(browser) {
    this.browser = browser;
    this.page = null;
    this.newsStoragePath = path.join(path.resolve(), "store.json");
  }

  async init() {
    this.page = await this.browser.newPage();
    console.log("Page created successfully.");
  }

  async closePage() {
    if (this.page) {
      await this.page.close();
    }
  }

  async getFullArticle(href) {
    await this.page.goto(href, { waitUntil: "networkidle2" });

    const newsArticle = await this.page.evaluate(() => {
      const article = {};
      article.title = document.querySelector("h1.artTitle")?.innerText;
      article.content = document.querySelector("div.artText")?.innerText;
      return article;
    });

    newsArticle.link = href;
    return newsArticle;
  }

  async loadStoredNews() {
    try {
      console.log("Loading stored news data...");
      const data = await fs.readFile(this.newsStoragePath, "utf-8");
      return JSON.parse(data).economictimes;
    } catch (error) {
      console.log("Error loading stored news:", error);
      return [];
    }
  }

  async saveNewsStorage(newNewsArray) {
    console.log("Saving news data in store...");
    const data = await fs.readFile(this.newsStoragePath, "utf-8");
    const jsonData = JSON.parse(data);

    // Update only the "economictimes" array
    jsonData.economictimes = newNewsArray;

    // Write the updated data back to the file, preserving other parts of the JSON
    await fs.writeFile(
      this.newsStoragePath,
      JSON.stringify(jsonData, null, 2),
      "utf-8"
    );
    console.log("News data saved successfully.");
  }

  async scrapeNews() {
    try {
      console.log("Scraping Economic Times news...");
      await this.init();
      await this.page.goto(
        "https://economictimes.indiatimes.com/markets/stocks/news",
        {
          waitUntil: "networkidle2",
        }
      );
      console.log("Economics Times Page loaded successfully.");
      const hrefs = await this.page.evaluate(() => {
        const storyElements = document.querySelectorAll("div.eachStory h3 a");
        return Array.from(storyElements).map((link) => link.href);
      });

      if (hrefs.length === 0) {
        console.log("No links found on the page");
        await this.closePage();
        return;
      }
      console.log("Number of links found:", hrefs.length);

      let newsStorage = await this.loadStoredNews();
      const newHrefs = hrefs.slice(0, 10).filter((href) => {
        return !newsStorage.some((news) => news.href === href);
      });

      console.log(
        "No. of new links found during this scraping",
        newHrefs.length
      );

      newHrefs.forEach((href) => {
        newsStorage.unshift({ href });
      });

      newsStorage = newsStorage.slice(0, 10);

      for (const href of newHrefs) {
        console.log("Scraping article:", href);
        const article = await this.getFullArticle(href);
        if (
          article.title === null ||
          article.title === undefined ||
          article.content === null ||
          article.content === undefined
        ) {
          console.log("Skipping article:", href);
          continue;
        }
        console.log("Saving article in Database:", article.title);
        try {
          await TheEconomicsTimes.create({
            title: article.title,
            link: article.link,
            content: article.content,
          });
        } catch (err) {
          console.log("Error in saving article", href);
        }
      }

      await this.saveNewsStorage(newsStorage);
      await this.closePage();
      console.log("Economic Times news scraped successfully.");
    } catch (error) {
      console.log("Error scraping The Economics Times:", error);
    }
  }
}

export default EconomicTimesScraper;
