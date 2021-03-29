import firebase from 'firebase/app';
import { backendAdmin } from "../firebaseInit";



const createRTDBConversation = (roomID: string, socketID: string, from: string = "from") => {
    // Creating and pushing room data to the backend database

    console.log("entered into createRTBD conversation from: ", from);

    const roomRef = backendAdmin
        .database()
        .ref(`/conversations/${roomID}/${socketID}`);

    roomRef.set({
        socketID: socketID
    });


    // want to remove the room when its 'holder'
    if (roomID === "holder") {
        roomRef.remove();
        roomRef.off();
    }

    // roomRef so the user can listen for added/removed children
    return roomRef.parent;
}


export {
    createRTDBConversation,
}

