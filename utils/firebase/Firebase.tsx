import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBMvfArMOyNyXJSgvpO_t6TWKPTS5JtXxE",
    authDomain: "nomja-c0d40.firebaseapp.com",
    databaseURL: "https://nomja-c0d40-default-rtdb.firebaseio.com",
    projectId: "nomja-c0d40",
    storageBucket: "nomja-c0d40.appspot.com",
    messagingSenderId: "975683339648",
    appId: "1:975683339648:web:1f4fd8ca85338904f72d65"
}

export var app

try {
    app = firebase.initializeApp(firebaseConfig)
    if (typeof window !== "undefined") {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        firebase.firestore().settings({
            ignoreUndefinedProperties: true,
        });      
        (window as any).firebase = firebase;
    }
} catch (e) {
    if (!/already exists/u.test(e.message)) {
        //console.error('Firebase Error', e.stack)
    } else {
        app = firebase.apps[0]
    }
}

export default firebase