import { getMessaging } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD6YDqr6n-xQIJgg3MH6Zwb511LeuY_Faw",
  authDomain: "red-alert-a6d6f.firebaseapp.com",
  projectId: "red-alert-a6d6f",
  storageBucket: "red-alert-a6d6f.firebasestorage.app",
  messagingSenderId: "373170844915",
  appId: "1:373170844915:web:828a276a71efbbfd547386",
  measurementId: "G-6FPWNC0XQS",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);
