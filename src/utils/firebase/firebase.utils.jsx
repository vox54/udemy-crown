import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCNXtdLxp1cujb5caSMuH_mgc-R9ca9aEE",
    authDomain: "crown-db-8cfb9.firebaseapp.com",
    projectId: "crown-db-8cfb9",
    storageBucket: "crown-db-8cfb9.appspot.com",
    messagingSenderId: "974905816557",
    appId: "1:974905816557:web:feca34cffb02ae2b30a3e4",
    measurementId: "G-FRG8KM4EZE"
  };
  
  // Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth,provider)
export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    
    const userDocRef = doc(db, 'users', userAuth.uid ) 

    const userSnapshot = await getDoc(userDocRef)
    console.log(userDocRef)
    console.log(userSnapshot.exists())
    alert(userSnapshot.exists())
    
    // if user data exists return docref else create and set data collection
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()
   
        try {
        await setDoc(userDocRef, {
            displayName,
            email,
            createdAt
        })
        } catch(error) {
       // alert('error creating user', error.message )
        }
    }
    return userDocRef
}