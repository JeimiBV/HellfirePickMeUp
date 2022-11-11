//import firebase from "firebase"
import "firebase/compat/storage"
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import { getAuth } from "firebase/auth";

export const app = firebase.initializeApp({
  "projectId": "pruebafirebase-30018",
  "appId": "1:567536522883:web:5d0157858a4aea89d92db6",
  "storageBucket": "pruebafirebase-30018.appspot.com",
  "locationId": "us-central",
  "apiKey": "AIzaSyDuQHUa77eSj4jILUI-zdyllYmybvH4wLw",
  "authDomain": "pruebafirebase-30018.firebaseapp.com",
  "messagingSenderId": "567536522883",
  "measurementId": "G-EWDEPM9N7M"
}); 
export const auth = getAuth(app);
/*export const app = firebase.initializeApp({
  "projectId": "fir-crud-c44e7",
  "appId": "1:589326742342:web:da57c21af8c35352fe2b47",
  "storageBucket": "fir-crud-c44e7.appspot.com",
  "locationId": "us-central",
  "apiKey": "AIzaSyDmh5N442FHmpypuGtqtcETKKzxd7EdRfk",
  "authDomain": "fir-crud-c44e7.firebaseapp.com",
  "messagingSenderId": "589326742342"
});*/