import firebase from 'firebase/app';
import 'firebase/storage'



let config ={
    apiKey: "AIzaSyB4iDokZ-NqHISrJNn_ky2tYneuJ9z3XwM",
    authDomain: "rfid-ae39e.firebaseapp.com",
    projectId: "rfid-ae39e",
    storageBucket: "rfid-ae39e.appspot.com",
    messagingSenderId: "984855385708",
    appId: "1:984855385708:web:71587e98b19efaa4dfaa49",
    measurementId: "G-NHEPTN4Q5M"
}
firebase.initializeApp(config)

const storage= firebase.storage();

export{
    storage,firebase as default
}

