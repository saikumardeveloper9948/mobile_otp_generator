// // firebaseConfig.js
// import { initializeApp } from 'firebase/app';
// import { getAuth, RecaptchaVerifier , connectAuthEmulator} from 'firebase/auth';


// // Your Firebase configuration object
// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APP_ID
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication
// const auth = getAuth(app);

// if (process.env.NODE_ENV === "development") {
//     connectAuthEmulator(auth, "http://localhost:3000");
//   }

// export { auth , RecaptchaVerifier};

// // // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// // // Your web app's Firebase configuration
// // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // const firebaseConfig = {
// //   apiKey: "AIzaSyDthLn3NaO5A5VJq_9mQMk0UQcLwoj90lk",
// //   authDomain: "phone-otp-3708f.firebaseapp.com",
// //   projectId: "phone-otp-3708f",
// //   storageBucket: "phone-otp-3708f.firebasestorage.app",
// //   messagingSenderId: "611737448857",
// //   appId: "1:611737448857:web:6f23f2369b53a6a618e308",
// //   measurementId: "G-CB5YD4GL1C"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
