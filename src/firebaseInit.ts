import dotenv from 'dotenv';
import * as admin from 'firebase-admin';
dotenv.config();


var serviceAccount = require("../ethan-hicks.json");

export const backendAdmin: admin.app.App = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ethan-hicks-default-rtdb.firebaseio.com/"
  });