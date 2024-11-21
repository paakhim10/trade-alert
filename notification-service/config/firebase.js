import admin from "firebase-admin";
import serviceAccount from "../firebase-service-account-config.json" with {type: "json"};

const initializeFirebase = () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase initialized successfully.");
    return admin;
  } catch (error) {
    console.error("Error initializing Firebase:", error);
    throw error; // Optionally rethrow the error if initialization should stop on failure
  }
};

export default initializeFirebase;
