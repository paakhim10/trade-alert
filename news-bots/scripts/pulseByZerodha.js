import fs from "fs/promises";
import { PulseByZerodha } from "../models/news-bots.model.js";
import path from "path";

class PulseByZerodhaScrapper {
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
    console.log("Getting article from", href);
    const newsArticle = await this.page.evaluate(() => {
      const article = {};
      article.title = document.querySelector(
        "h1.story-base-template-m__story-headline__zqorD"
      )?.innerText;
      const articleBlocks = document.querySelectorAll(
        "div.story-elements-m__story-element-ctx__tV2U1 p"
      );

      for (const block of articleBlocks) {
        for (const child of block.childNodes) {
          if (
            child.nodeType === Node.TEXT_NODE ||
            child.nodeType === Node.ELEMENT_NODE
          ) {
            article.content += child.textContent.trim() + " ";
          }
        }
      }
      return article;
    });
    console.log("Got article", newsArticle);
    newsArticle.link = href;
    return newsArticle;
  }

  async loadStoredNews() {
    try {
      console.log("Loading stored news data...");
      const data = await fs.readFile(this.newsStoragePath, "utf-8");
      return JSON.parse(data).pulsebyzerodha;
    } catch (error) {
      return [];
    }
  }

  async saveNewsStorage(newNewsArray) {
    console.log("Saving news data in store.json...");
    const data = await fs.readFile(this.newsStoragePath, "utf-8");
    const jsonData = JSON.parse(data);
    jsonData.pulsebyzerodha = newNewsArray;

    await fs.writeFile(
      this.newsStoragePath,
      JSON.stringify(jsonData, null, 2),
      "utf-8"
    );
  }

  async scrapeNews() {
    try {
      console.log("Scraping PulseByZerodha news...");
      await this.init();
      await this.page.goto("https://pulse.zerodha.com/", {
        waitUntil: "networkidle2",
      });
      console.log("Page loaded successfully.");

      const hrefs = await this.page.evaluate(() => {
        const links = Array.from(
          document.querySelectorAll("ul#news li.box.item h2.title a")
        );
        return links.map((link) => link.href);
      });

      if (hrefs.length === 0) {
        console.log("No links found on the page");
        await this.closePage();
        return;
      }
      console.log("Number of links found:", hrefs.length);

      let newsStorage = await this.loadStoredNews();
      // const newHrefs = hrefs.slice(0, 10).filter((href) => {
      //   return !newsStorage.some((news) => news.href === href);
      // });
      const newHrefs = hrefs.slice(0, 10);

      console.log(
        "No. of new links found during this scraping",
        newHrefs.length
      );

      newHrefs.forEach((href) => {
        newsStorage.unshift({ href });
      });

      newsStorage = newsStorage.slice(0, 10);

      console.log("Getting full article and saving to DB...");

      for (const href of newHrefs) {
        console.log("Scraping article:", href);
        const article = await this.getFullArticle(href);
        if (
          article.title === undefined ||
          article.content === undefined ||
          article.title === null ||
          article.content === null
        ) {
          console.log("Skipping article:", href);
          continue;
        }
        console.log("Saving article in Database:", article.title);
        try {
          await PulseByZerodha.create({
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
      console.log("PulseByZerodha news scraped successfully.");
    } catch (error) {
      console.error("Error scraping data:", error);
    }
  }
}

export default PulseByZerodhaScrapper;
