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
    icon: "/assets/images/logo_icon.png",
    badge: "/assets/images/logo_icon.png", // Small icon to appear on the notification tray
    image: "/assets/images/logo_icon.png", // Main notification image
    vibrate: [200, 100, 200],
    actions: [
      {
        action: "open_url",
        title: "Read more",
        icon: "/assets/images/logo_icon.png",
      },
    ],
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // Close the notification

  const url = event.notification.data?.url; // Access the URL from notification data
  if (event.action === "open_url" && url) {
    // Open the URL if the action matches
    event.waitUntil(clients.openWindow(url));
  } else if (url) {
    // Fallback: Open URL on general notification click
    event.waitUntil(clients.openWindow(url));
  }

  console.log("Notification clicked: ", event);
});
