  
// ----------------------- Libraries -----------------------
import express from 'express';
import http from 'http';
import cors from 'cors';
import multer from 'multer';
import nodemailer from 'nodemailer'
var path = require('path');
require('dotenv').config();

import { uploadNotification } from "./firebaseWrappers/firebaseFirestore";

const app = (module.exports = express());
const server: http.Server = http.createServer(app);
const port = 8080;

// app.set('view engine', 'ejs');
// app.use(express.static('public')); // Set up to serve static files. (prolly) Not needed because Next
app.use(express.json());
app.use(cors({origin: "*"}));

// const upload = multer();
// const type = upload.single('streamImage'); 

console.log(process.env.PASSWORD);


app.get('/', (request, response) => {
    response.status(200).send({
        message: "Hello there",
        general: "kenobi",
        extra: "Message",
        again: "extra",
        NoMore: "Refresh and reload"
    });
    // response.sendFile(path.join(__dirname + '/../public/index.html'));
});

app.post("/contactMe", (request, response) => {
    
    const notification = request.body;
    const data = {
        email: notification.email,
        name: notification.name,
        company: notification.company,
        message: notification.message,
    }
    console.log(data);

    uploadNotification(data);

    response.status(200).send({
        message: "Success",
    });


})

server.listen(port, () => {
    // console.log(`model.id = ${nanoid()}`);
    return console.log(`\n\nBACKEND\n\nserver is listening on ${port}`);
});
// refresh // refresh