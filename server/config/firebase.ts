// Import the functions you need from the SDKs you need

// Import Firebase core initializer used to connect the app to a Firebase project
import { initializeApp } from "firebase/app";

// Import Firebase Storage service which allows uploading and retrieving files (images, documents, etc.)
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// These credentials identify which Firebase project this frontend connects to.
const firebaseConfig = {
  apiKey: "AIzaSyAyCaVB-HZM1y7OGGWn_UcZRp4iqQ3i7jI", // Public API key used to authorize requests from the client app
  authDomain: "aims-ed004.firebaseapp.com", // Domain used for Firebase authentication and hosting services
  projectId: "aims-ed004", // Unique identifier for the Firebase project in Google Cloud
  storageBucket: "aims-ed004.firebasestorage.app", // Storage bucket where uploaded files will be stored
  messagingSenderId: "572280357220", // Sender ID used for Firebase Cloud Messaging (push notifications)
  appId: "1:572280357220:web:9fb39a30d8201e940d7a71", // Unique ID representing this specific web application
  measurementId: "G-D0HW69YK3Q" // Google Analytics measurement ID (optional but used for analytics tracking)
};

// Initialize Firebase using the configuration above.
// This establishes the connection between the React application and the Firebase backend services.
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Storage service using the connected Firebase app.
// This instance will be used throughout the application to upload and retrieve files.
export const storage = getStorage(app);