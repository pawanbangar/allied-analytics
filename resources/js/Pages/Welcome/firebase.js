import {initializeApp} from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axios from "axios";
const firebaseConfig = {
    apiKey: "AIzaSyBSlTBTMORb_LINGCwkwG_cfiRKoF4dQVU",
    authDomain: "allied-6d830.firebaseapp.com",
    projectId: "allied-6d830",
    storageBucket: "allied-6d830.appspot.com",
    messagingSenderId: "69899053493",
    appId: "1:69899053493:web:55cf2e86e1dc9fc47711fc"
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
export const getTokenCustom = (setTokenFound) => {
    return getToken(messaging, {vapidKey: 'BIJpn626o5DZwJd0nb7g7_PmMWRj-zNNSBrFq5g9iXENZptyI5iXjiuE2hhZr4MI7S-ZYW9avZ2LEUZ46J5A9xM'}).then((currentToken) => {
        if (currentToken) {
            axios({
                method: 'post',
                url: 'http://localhost:8000/token',
                data: {
                    _token:document.head.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    token: currentToken
                }
            });
            setTokenFound(true);
            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
        } else {
            console.log('No registration token available. Request permission to generate one.');
            setTokenFound(false);
            // shows on the UI that permission is required
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
