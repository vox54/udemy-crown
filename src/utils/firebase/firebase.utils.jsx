import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword
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
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)
export const db = getFirestore()

export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {displayName: 'JY'} 
) => {
    if(!userAuth) return

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
            createdAt,
            ...additionalInformation
        })
        } catch(error) {
       // alert('error creating user', error.message )
        }
    }
    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return

    return await createAuthUserWithEmailAndPassword(auth, email, password)
}