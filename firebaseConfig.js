const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyAd4MPPRxE4AUVqBNMA9ng93KbWmEq5mLI",
  authDomain: "web-application-nodejs.firebaseapp.com",
  projectId: "web-application-nodejs",
  storageBucket: "web-application-nodejs.appspot.com",
  messagingSenderId: "165021254999",
  appId: "1:165021254999:web:edf78ace64f120bfc92a12",
};

var admin = require("firebase-admin");

var serviceAccount = require("./web-application-nodejs-firebase-adminsdk-kldm7-74a4da70bb.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firestore
const db = getFirestore(app);

module.exports = { db };
