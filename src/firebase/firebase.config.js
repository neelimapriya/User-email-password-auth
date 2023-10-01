// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDMorDKFwV1Fa_G0NemTo7eujFTZY_oeA",
  authDomain: "user-email-password-auth-cad9e.firebaseapp.com",
  projectId: "user-email-password-auth-cad9e",
  storageBucket: "user-email-password-auth-cad9e.appspot.com",
  messagingSenderId: "252737286086",
  appId: "1:252737286086:web:3be5ee0f3663c1fdbeccc7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;