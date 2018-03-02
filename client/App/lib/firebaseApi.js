import * as firebase from 'firebase';
import {config} from '../../firebaseConfig';
if(firebase.apps.length<1){
    firebase.initializeApp(config);    
}
const db=firebase.database();
export const dbRef=db.ref().child("members");
export const dbRefMessage=db.ref().child("message");