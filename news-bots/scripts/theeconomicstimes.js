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
      console.log("path: ", this.newsStoragePath);
      const data = await fs.readFile(this.newsStoragePath, "utf-8");
      return JSON.parse(data).economictimes;
    } catch (error) {
      console.log("Error loading stored news:", error);
      return [];
    }
  }

  async saveNewsStorage(newNewsArray) {
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
      await this.init();
      await this.page.goto(
        "https://economictimes.indiatimes.com/markets/stocks/news",
        {
          waitUntil: "networkidle2",
        }
      );

      const hrefs = await this.page.evaluate(() => {
        const storyElements = document.querySelectorAll("div.eachStory h3 a");
        return Array.from(storyElements).map((link) => link.href);
      });

      let newsStorage = await this.loadStoredNews();
      const newHrefs = hrefs.slice(0, 10).filter((href) => {
        return !newsStorage.some((news) => news.href === href);
      });
      console.log(newHrefs);

      newHrefs.forEach((href) => {
        newsStorage.unshift({ href });
      });

      newsStorage = newsStorage.slice(0, 10);

      for (const href of newHrefs) {
        const article = await this.getFullArticle(href);
        const newsArticle = await TheEconomicsTimes.create({
          title: article.title,
          link: article.link,
          content: article.content,
        });
        console.log("News Article:", newsArticle);
      }

      await this.saveNewsStorage(newsStorage);
      await this.closePage();
    } catch (error) {
      console.error("Error scraping data:", error);
    }
  }
}

export default EconomicTimesScraper;
