// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByKQmUDPLTNiXVU-ITKbLKl4SfL4nE7iM",
  authDomain: "moneta-8025d.firebaseapp.com",
  projectId: "moneta-8025d",
  storageBucket: "moneta-8025d.appspot.com",
  messagingSenderId: "629805419305",
  appId: "1:629805419305:web:735fef8e6742c6e3844538",
  measurementId: "G-K1S6NJMK8C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;