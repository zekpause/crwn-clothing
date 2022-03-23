import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCKUewZ7GVWj3_W49TsBAmMTu8jqsIQmOQ",
  authDomain: "crwn-clothing-db-f73a9.firebaseapp.com",
  projectId: "crwn-clothing-db-f73a9",
  storageBucket: "crwn-clothing-db-f73a9.appspot.com",
  messagingSenderId: "1008977881266",
  appId: "1:1008977881266:web:0a6d2a9acab77d33e541ab"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {displayName: 'mike'}) => {

  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message)
    }

  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
}



