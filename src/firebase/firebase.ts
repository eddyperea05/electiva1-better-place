import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOt2mFzEqwTocCZrKAMix_XtiKA5p25zE",
  authDomain: "electiva-1-better-place.firebaseapp.com",
  projectId: "electiva-1-better-place",
  storageBucket: "electiva-1-better-place.firebasestorage.app",
  messagingSenderId: "36310906477",
  appId: "1:36310906477:web:4898b3690fabea3820f164"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db,
}
