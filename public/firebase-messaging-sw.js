// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyBSlTBTMORb_LINGCwkwG_cfiRKoF4dQVU",
    authDomain: "allied-6d830.firebaseapp.com",
    projectId: "allied-6d830",
    storageBucket: "allied-6d830.appspot.com",
    messagingSenderId: "69899053493",
    appId: "1:69899053493:web:55cf2e86e1dc9fc47711fc"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});
