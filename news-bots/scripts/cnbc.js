import fs from "fs/promises";
import { CNBC } from "../models/news-bots.model.js";
import path from "path";

class CNBCScraper {
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
      //   article.title = document.querySelector("h1.ArticleHeader_headline")?.innerText;
      //   article.content = document.querySelector("div.ArticleBody_body")?.innerText;
      return article;
    });

    newsArticle.link = href;
    return newsArticle;
  }

  async loadStoredNews() {
    try {
      console.log("Loading stored news data...");
      const data = await fs.readFile(this.newsStoragePath, "utf-8");
      return JSON.parse(data).cnbc;
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
    jsonData.cnbc = newNewsArray;

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
      console.log("Scraping CNBC news...");
      await this.init();
      await this.page.goto("https://www.cnbc.com/world/", {
        waitUntil: "networkidle2",
      });
      console.log("CNBC page loaded successfully.");

      const hrefs = await this.page.evaluate(() => {
        const links = Array.from(
          document.querySelectorAll(
            "ul.LatestNews-list li.LatestNews-item div.LatestNews-container div.LatestNews-headlineWrapper a.LatestNews-headline"
          )
        );
        return links.map((link) => link.href);
      });
      if (hrefs.length() === 0) {
        console.log("No links found on the page");
        await this.closePage();
        return;
      }
      console.log("Number of links found:", hrefs.length());
    } catch (error) {
      console.log("Error scraping CNBC news:", error);
    }
  }
}

export default CNBCScraper;
