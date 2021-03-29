import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
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
}; 


const getPuzzle = (puzzle: number): Promise<PuzzleData> => {
    const puzStr = puzzle.toString();
    
    return new Promise((resolve, reject) => {
        return backendAdmin
            .firestore()
            .collection("/sudoku")
            .doc(puzStr)
            .get()
            .then((doc: DocumentSnapshot) => {
                resolve(doc.data() as PuzzleData)
            }).catch((e) => {
                console.log("there has been and error in getPuzzle. Error: ", e);
            })
    })

}

export {
    uploadNotification,
    getPuzzle
}