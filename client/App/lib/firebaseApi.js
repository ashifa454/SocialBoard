import * as firebase from 'firebase';
import {config} from '../../firebaseConfig';
firebase.initializeApp(config);
const db=firebase.database();
export const dbRef=db.ref().child("members");