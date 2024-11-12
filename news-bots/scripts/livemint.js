import fs from "fs/promises";
import { LiveMint } from "./news.model.js";

class liveMintScrapper {
  constructor(browser) {
    this.browser = browser;
    this.page = null;
    this.newsStoragePath = "store.json";
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
      //   article.title = document.querySelector("h1.artTitle")?.innerText;
      //   article.content = document.querySelector("div.artText")?.innerText;
      return article;
    });

    newsArticle.link = href;
    return newsArticle;
  }
  async loadStoredNews() {
    try {
      const data = await fs.readFile(this.newsStoragePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
  async saveNewsStorage(newsStorage) {
    await fs.writeFile(
      this.newsStoragePath,
      JSON.stringify(newsStorage, null, 2)
    );
  }
  async scrapeNews() {
    try {
      await this.init();
      await this.page.goto(
        "https://www.livemint.com/market/stock-market-news",
        {
          waitUntil: "networkidle2",
        }
      );

      const hrefs = await this.page.evaluate(() => {
        // const storyElements = document.querySelectorAll("div.eachStory h3 a");
        // return Array.from(storyElements).map((link) => link.href);
      });

      let newsStorage = await this.loadStoredNews();
      const newHrefs = hrefs.slice(0, 10).filter((href) => {
        return !newsStorage.some((news) => news.href === href);
      });

      newHrefs.forEach((href) => {
        newsStorage.unshift({ href });
      });

      newsStorage = newsStorage.slice(0, 10);

      for (const href of newHrefs) {
        const article = await this.getFullArticle(href);
        const newsArticle = await LiveMint.create({
          title: article.title,
          link: article.link,
          content: article.content,
        });
      }

      await this.saveNewsStorage(newsStorage);
      await this.closePage();
    } catch (error) {
      console.error("Error scraping data:", error);
    }
  }
}

export default liveMintScrapper;
