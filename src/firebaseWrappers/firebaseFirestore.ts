import firebase from 'firebase/app';
import { backendAdmin } from "../firebaseInit";


const uploadNotification = (notification: any) => {

    backendAdmin
    .firestore()
    .collection("/notification")
    .doc(Date.now().toString())
    .set(notification)
    .then(() => {
        console.log("SUCCESS");
    })
}

export {
    uploadNotification
}