import { auth, initializeApp } from 'firebase';
import firebaseConfig from '../../config';
const config = firebaseConfig;

auth.Auth.Persistence.LOCAL; //https://firebase.google.com/docs/auth/web/auth-state-persistence
initializeApp(config);


const googleAuthProvider = new auth.GoogleAuthProvider();
const facebookAuthprovider = new auth.FacebookAuthProvider();

export { firebase, googleAuthProvider, facebookAuthprovider };
