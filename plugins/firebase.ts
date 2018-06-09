import firebase from 'firebase'
/*
let config = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_APIKEY,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}
*/
let config = {
    apiKey: 'AIzaSyDOtSB1OQxISdfN2uJsxROKeU9-1SC2BBA',
    authDomain: 'boingu-e5d03.firebaseapp.com',
    databaseURL: 'https://boingu-e5d03.firebaseio.com',
    projectId: 'boingu-e5d03',
    storageBucket: 'boingu-e5d03.appspot.com',
    messagingSenderId: '342800857588'
}
firebase.initializeApp(config)
firebase.firestore().settings({ timestampsInSnapshots: true })