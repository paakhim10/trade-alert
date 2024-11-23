import connectDB from "./config/db.js";
import { User } from "./models/user.model.js";
import {
  TheEconomicsTimes,
  TheHindustanTimes,
  TheIndianExpress,
  Tribune,
  CNBC,
  LiveMint,
  PulseByZerodha,
  TheTimesOfIndia,
} from "./models/news.model.js";
import initializeFirebase from "./config/firebase.js";
import dotenv from "dotenv";
import { ChatGroq } from "@langchain/groq";
import { Pinecone } from "@pinecone-database/pinecone";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import transporter from "./config/mailer.js";
import path from "path";
import fs from "fs/promises";

dotenv.config();

const sendNotificationInApp = async (token, admin, news) => {
  let newsBody =
    news.content.length > 100
      ? news.content.slice(0, 100) + "..."
      : news.content;
  newsBody += "Read more at: " + news.link;
  const message = {
    notification: {
      title: news.title,
      body: newsBody,
    },
    data: {
      url: news.link, // Add the URL here
    },
    token: token, // Add the user's device token here
  };

  try {
    const response = await admin.messaging().send(message); // Pass only the message object
    console.log("Notification sent successfully to user");
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

const sendEmailNotification = async (email, news) => {
  const templatePath = path.join(
    path.resolve(),
    "templates",
    "notification.template.html"
  );
  let htmlContent = await fs.readFile(templatePath, "utf-8");

  // console.log("news", news);
  // console.log("Original HTML Content:", htmlContent);

  // Replace placeholders with actual data
  htmlContent = htmlContent.replace(/{{newsTitle}}/g, news.title);
  htmlContent = htmlContent.replace(/{{newsContent}}/g, news.content);
  htmlContent = htmlContent.replace(/{{newsLink}}/g, news.link);

  // console.log("Processed HTML Content:", htmlContent);

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: "Stock Market News Alert",
    html: htmlContent,
    attachments: [
      {
        filename: "logo.svg", // The name of the file in the email
        path: path.join(path.resolve(), "templates", "assets", "logo.png"), // The path to the image file
        cid: "logo@cid", // Unique content ID for inline images
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email notification sent successfully");
  } catch (error) {
    console.error("Error sending email notification:", error);
  }
};

const fetchUnprocessedNews = async () => {
  const newsSources = [
    { name: "LiveMint", model: LiveMint },
    { name: "The Economic Times", model: TheEconomicsTimes },
    { name: "Hindustan Times", model: TheHindustanTimes },
    { name: "The Indian Express", model: TheIndianExpress },
    { name: "The Tribune", model: Tribune },
    { name: "CNBC", model: CNBC },
    { name: "Pulse by Zerodha", model: PulseByZerodha },
    { name: "Times of India", model: TheTimesOfIndia },
  ];

  try {
    for (const source of newsSources) {
      const news = await source.model.findOne({ isProcessed: false });
      if (news) {
        console.log(`Unprocessed news found in ${source.name}`);
        return { news: news, source: source.name };
      }
      console.log(`No unprocessed news found in ${source.name}`);
    }
    return null;
  } catch (error) {
    console.error("Error fetching unprocessed news:", error);
    return null;
  }
};

const cleanAndSummarizeNews = async (news) => {
  const systemMessage =
    "You are a stock market expert tasked with converting raw, scraped news articles, which may contain unnecessary information, into a clear, concise, and summarized form. Your output must provide actionable insights relevant to the stock market, focusing on key points, implications, and impacts on sectors or specific stocks. Return the summarized text. Include only the most pertinent information and omit all superfluous details. Response should be in plain text and not exceed 100 words";
  const humanMessageTemplate = `Here is a raw scraped news article: 
    
    {input}. 
    
    Summarize it with actionable insights for the stock market, focusing on relevant sectors or stocks. Provide the summarised text excluding all extraneous information.`;

  // Replace the placeholder with the actual news content
  const humanMessage = humanMessageTemplate.replace("{input}", news.content);

  const llmAgent = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.1-70b-versatile",
    temperature: 0,
  });

  try {
    // Send the system and human messages to the LLM
    const response = await llmAgent.invoke([
      new SystemMessage(systemMessage),
      new HumanMessage(humanMessage),
    ]);
    news.content = response.content; // Update the news content with the summary
  } catch (error) {
    console.error("Error summarizing news:", error);
  }

  return news;
};

const getCompaniesFromNews = async (news) => {
  const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  const model = "multilingual-e5-large";
  try {
    const embeddings = await pc.inference.embed(model, [news.content], {
      inputType: "passage",
      truncate: "END",
    });
    const response = await pc.index("trade-alert").query({
      vector: embeddings[0].values, // Use the generated embedding
      topK: 5, // Retrieve the top 5 most relevant companies
      includeMetadata: true, // Include metadata in the response
    });
    return response.matches.map((match) => ({
      company: match.metadata.name, // Company name from metadata
      score: match.score, // Similarity score
    }));
  } catch (error) {
    console.error("Error generating embeddings:", error);
  }
};

const findCompaniesAffectedByNews = async (relatedCompanies, news) => {
  let systemMessage =
    "You are a stock market expert tasked with analyzing the impact of news articles on specific companies. Given a list of companies and a news article, determine which companies are most likely to be affected by the news. Return only the name of the companies seprated by commas in plain text that are the affected by the news. No need to provide any other information.";

  let humanMessage =
    "Given the news article: {{news}}, these are the companies to be checked: {{companies}}. Which companies are most likely to be affected?";

  const llmAgent = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.1-70b-versatile",
    temperature: 0,
  });

  try {
    // Prepare the dynamic values
    const inputValues = {
      companies: JSON.stringify(relatedCompanies.map((c) => c.company)),
      news: news.content,
    };

    humanMessage = humanMessage.replace("{{news}}", inputValues.news);
    humanMessage = humanMessage.replace("{{companies}}", inputValues.companies);

    const response = await llmAgent.invoke([
      new SystemMessage(systemMessage),
      new HumanMessage(humanMessage),
    ]);
    console.log("Response from LLM:", response.content);
    return response.content.split(",").map((c) => c.trim());
  } catch (error) {
    console.error("Error invoking LLM or parsing response:", error);
    return [];
  }
};

// Main function to initialize and execute tasks
const main = async () => {
  try {
    await connectDB();
    const admin = initializeFirebase();

    while (true) {
      let { news, source } = await fetchUnprocessedNews();
      if (!news) {
        break;
      }
      console.log("Processing news:", news.title);

      news = await cleanAndSummarizeNews(news);
      console.log("\nCleaned and summarized news: \n\n", news.content);

      console.log("\n------------------------------------\n");

      let relatedCompanies = await getCompaniesFromNews(news);
      console.log("Related companies:", relatedCompanies);

      console.log("\n------------------------------------\n");

      const companies = await findCompaniesAffectedByNews(
        relatedCompanies,
        news
      );
      console.log("Affected companies:", companies);

      console.log("\n------------------------------------\n");

      const users = await User.find({
        "companyStocks.name": { $in: companies },
      });

      console.log("Users to notify:", users);

      console.log("\n------------------------------------\n");

      for (const user of users) {
        console.log("Sendng Notification to user:", user.name);
        if (user.userPreferences.news_partners.includes(source)) {
          if (
            user.userPreferences.alert_preference.alertTypes.includes("Email")
          ) {
            // Send email notification
            console.log("Sending email notification to user:", user.email);
            await sendEmailNotification(user.email, news);
          }
          if (
            user.userPreferences.alert_preference.alertTypes.includes("Push")
          ) {
            if (user.notificationToken) {
              try {
                await sendNotificationInApp(
                  user.notificationToken,
                  admin,
                  news
                );
              } catch (err) {
                console.error("Error sending notification to user:", err);
              }
            }
          }
        }
        console.log("\n------------------------------------\n");
      }

      console.log("News processed successfully");

      // news.isProcessed = true;
      // await news.save();

      break;
    }
  } catch (error) {
    console.error("An error occurred during execution:", error);
  }
};

main();

setInterval(main, 1000 * 60 * 60); // Run the main function every hour
