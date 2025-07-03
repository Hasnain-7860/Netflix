import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBA7pvQ4YtXZiz_zaBpLVWQyrDWR519MWA",
  authDomain: "netflix-1d2ff.firebaseapp.com",
  projectId: "netflix-1d2ff",
  storageBucket: "netflix-1d2ff.firebasestorage.app",
  messagingSenderId: "699620231348",
  appId: "1:699620231348:web:1ebd81a18297df399e2fe1"
};


const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
const db  = getFirestore(app);

const signup = async(name,email,password)=>{
try {
   const res= await createUserWithEmailAndPassword(auth,email,password);
   const user = res.user;
   await addDoc(collection(db, "user"),{
    uid: user.uid,
    name,
    authProvider: "local",
    email,
   })
} catch (error) {
    console.log(error);
    toast.error(error.code);
}
}


const login = async(email, password)=>{
    try {
       await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
        toast.error(error.code);

      
    }
}

const logout =()=>{
    signOut(auth);
}
export{auth, db, login, signup, logout}