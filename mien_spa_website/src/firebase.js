import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVReFp15SkmOlqq0bucqmMlm9DczXJ39o",
  authDomain: "mien-spa.firebaseapp.com",
  projectId: "mien-spa",
  storageBucket: "mien-spa.appspot.com",
  messagingSenderId: "961106616129",
  appId: "1:961106616129:web:ab8741c46f72eb25af0bc0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;