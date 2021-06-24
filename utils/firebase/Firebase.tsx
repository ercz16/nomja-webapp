import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'
import 'firebase/functions'

const fb = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyBMvfArMOyNyXJSgvpO_t6TWKPTS5JtXxE",
        authDomain: "nomja-c0d40.firebaseapp.com",
        databaseURL: "https://nomja-c0d40-default-rtdb.firebaseio.com",
        projectId: "nomja-c0d40",
        storageBucket: "nomja-c0d40.appspot.com",
        messagingSenderId: "975683339648",
        appId: "1:975683339648:web:1f4fd8ca85338904f72d65"
    }

    if (typeof window !== "undefined" && !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        firebase.firestore().settings({
            ignoreUndefinedProperties: true,
        });      
        (window as any).firebase = firebase;
    }
    return firebase
}

export { fb }