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

dotenv.config();

const sendNotification = async (token, admin) => {
  const message = {
    notification: {
      title: "You should read this news!",
      body: "USA is planning to break google by forcing it to sell google chrome",
    },
    token: token, // Add the token here
  };

  try {
    const response = await admin.messaging().send(message); // Pass only the message object
    console.log("Notification sent successfully:", response);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

const fetchUnprocessedNews = async () => {
  const newsSources = [
    { name: "TheEconomicsTimes", model: TheEconomicsTimes },
    { name: "TheHindustanTimes", model: TheHindustanTimes },
    { name: "TheIndianExpress", model: TheIndianExpress },
    { name: "Tribune", model: Tribune },
    { name: "CNBC", model: CNBC },
    { name: "LiveMint", model: LiveMint },
    { name: "PulseByZerodha", model: PulseByZerodha },
    { name: "TheTimesOfIndia", model: TheTimesOfIndia },
  ];

  try {
    for (const source of newsSources) {
      const news = await source.model.findOne({ isProcessed: false });
      if (news) {
        console.log(`Unprocessed news found in ${source.name}`);
        return news;
      }
      console.log(`No unprocessed news found in ${source.name}`);
    }
    return null;
  } catch (error) {
    console.error("Error fetching unprocessed news:", error);
    return null;
  }
};

// Main function to initialize and execute tasks
const main = async () => {
  try {
    await connectDB();
    const admin = initializeFirebase();

    while (true) {
      const news = await fetchUnprocessedNews();
      if (!news) {
        break;
      }

      // Clean the news content, summarise the news and save it to the database as well
      // Get the companies mentioned in the news with their stock symbols
      // Verify if the companies are actually being affected by the news
      // Get the users who have subscribed to the news source and has the company stocks
      // send notification to the users

      news.isProcessed = true;
      await news.save();
    }
  } catch (error) {
    console.error("An error occurred during execution:", error);
  }
};

main();

setInterval(main, 1000 * 60 * 60); // Run the main function every hour
