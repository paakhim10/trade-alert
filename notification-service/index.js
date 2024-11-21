import connectDB from "./config/db.js";
import { User } from "./models/user.model.js";
import initializeFirebase from "./config/firebase.js";

await connectDB();

const sendNotification = async (token, admin) => {
  const message = {
    notification: {
      title: "Test message",
      body: "This is a test notification",
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

// Main function to initialize and execute tasks
const main = async () => {
  try {
    // await initializeDatabase();
    const admin = initializeFirebase();

    // Example usage of sendNotification
    const deviceToken =
      "e2UjYjNlR9KfEANZLqX7QZ:APA91bHPbJu7COa95DpEuoMjCSscSFUqt0MU_tpMEuALt0GGFkUj12IVoqYX9uwRVXkC3FCLVm0B1CptfckMF5OF0wcOiLMf8-VhdEAaGQ1de9WFCH16m5o"; // Replace with the actual device token
    await sendNotification(deviceToken, admin);
  } catch (error) {
    console.error("An error occurred during execution:", error);
  }
};

main();
