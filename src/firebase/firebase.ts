import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

//Credenciales de direbase
const firebaseConfig = {
  apiKey: "AIzaSyCOt2mFzEqwTocCZrKAMix_XtiKA5p25zE",
  authDomain: "electiva-1-better-place.firebaseapp.com",
  projectId: "electiva-1-better-place",
  storageBucket: "electiva-1-better-place.firebasestorage.app",
  messagingSenderId: "36310906477",
  appId: "1:36310906477:web:4898b3690fabea3820f164"
};

//Función para inicializar la app de firebase
const app = initializeApp(firebaseConfig);

//Función para llamar a la base de datos de firebase
const db = getFirestore(app);

//Función para llamar la authenticacion por Email y password
const auth = getAuth(app);

//Objeto para autenticar con google
const googleProvider = new GoogleAuthProvider();

export {
    db,
    auth,
    googleProvider,
}
