  
// ----------------------- Libraries -----------------------
import express from 'express';
import http from 'http';
import cors from 'cors';
import multer from 'multer';

/**
 * TODO:
 * Host my own peer server with
 *      npm install -g peer
 *      peerjs --port {PORT}
 */

const app = (module.exports = express());
const server: http.Server = http.createServer(app);
const port = 8080;

// app.set('view engine', 'ejs');
// app.use(express.static('public')); // Set up to serve static files. (prolly) Not needed because Next
app.use(express.json());
app.use(cors({origin: "*"}));

const upload = multer();
const type = upload.single('streamImage'); // Whatever this is, I dont like it

app.get('/', (request, response) => {
    // res.redirect(`/${nanoid()}`);
    response.status(200).send({
        message: "Hello there",
        general: "kenobi",
        extra: "Message",
        again: "extra",
        NoMore: "Refresh and reload"
    });
});

app.get('/testing', (req, res) => {
    res.status(200).send('Hello, world!')
})

app.post('/streamCreation', type, (request, response) => {
    // console.log("recieved a thing from a frontend");
    // const { general } = request.body;

    console.log(request.body);
    if (request.file) {
        console.log(request.file);
    }
    response.status(200).send({
        time: 'to get data',
    })
})

server.listen(port, () => {
    // console.log(`model.id = ${nanoid()}`);
    return console.log(`\n\nBACKEND\n\nserver is listening on ${port}`);
});
// refresh // refresh