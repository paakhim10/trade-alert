importScripts(
  "https://www.gstatic.com/firebasejs/9.16.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.16.0/firebase-messaging-compat.js"
);

var firebaseConfig = {
  apiKey: "AIzaSyD6YDqr6n-xQIJgg3MH6Zwb511LeuY_Faw",
  authDomain: "red-alert-a6d6f.firebaseapp.com",
  projectId: "red-alert-a6d6f",
  storageBucket: "red-alert-a6d6f.firebasestorage.app",
  messagingSenderId: "373170844915",
  appId: "1:373170844915:web:828a276a71efbbfd547386",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    vibrate: [200, 100, 200],
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
