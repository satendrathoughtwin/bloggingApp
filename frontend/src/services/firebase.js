// Your web app's Firebase configuration

import { initializeApp } from "firebase/app";
import {getStorage} from"firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCWyOpp_95VwrTsBnBCuuE93-GauN3HhMA",
    authDomain: "blogingapp-e7d8b.firebaseapp.com",
    projectId: "blogingapp-e7d8b",
    storageBucket: "blogingapp-e7d8b.appspot.com",
    messagingSenderId: "566383128464",
    appId: "1:566383128464:web:99842d40c3616b5aaccd15"
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app)

  export {app, storage}