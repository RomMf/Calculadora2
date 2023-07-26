// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFiRSov9nRkevDSbq74moez4QaUIRMRtI",
  authDomain: "calculadora-ea818.firebaseapp.com",
  databaseURL: "https://calculadora-ea818-default-rtdb.firebaseio.com",
  projectId: "calculadora-ea818",
  storageBucket: "calculadora-ea818.appspot.com",
  messagingSenderId: "668665171501",
  appId: "1:668665171501:web:7fba427453df6eaca872a4",
  measurementId: "G-ZJ2FFHME5D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
