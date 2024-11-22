import connectDB from "./config/db.js";
import { User } from "./models/user.model.js";
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

const fetchUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// Main function to initialize and execute tasks
const main = async () => {
  try {
    await connectDB();
    const admin = initializeFirebase();

    const users = await fetchUsers();

    for (const user of users) {
      await sendNotification(user.notificationToken, admin);
    }
  } catch (error) {
    console.error("An error occurred during execution:", error);
  }
};

main();
