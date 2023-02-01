import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import "firebase/auth"
import 'firebase/storage';
import tokens from "./variables";

const firebaseConfig = tokens.firebase;

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


export const storage = getStorage(app, firebaseConfig.storageBucket);
export const firestore = getFirestore();