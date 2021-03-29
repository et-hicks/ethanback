import http from 'http';
import * as SocketIO from 'socket.io'

import { createRTDBConversation } from '../firebaseWrappers/firebaseRTDB';

const setUpSocketIOServer = (server: http.Server) => {
    const io = require('socket.io')(server, 
        {cors: {
            origin: "*",
        },
        maxHttpBufferSize: 1.5e8, // 15mb
        pingTimeout: 12_000,    // 12 seconds
        pingInterval: 35_000,   // 35 seconds
    });
    
    io.on('connection', (socket: SocketIO.Socket) => {
        console.log(socket.id, "is backend connected");
        setUpRoom(io, socket);
    });

    return io;
};

const setUpRoom = (io: any, socket: SocketIO.Socket) => {
    
    // let listRef = createRTDBConversation("holder", socket.id, "setUpRoom");
    /**
     * Server Step 1: Host/Consumer lets server know of a new connection
     */
    socket.on('join-room', (roomID: string, myPeerID: string) => {
        
        // User joins room
        socket.join(roomID);
        socket.to(roomID).broadcast.emit('user-connected', myPeerID);
        console.log(myPeerID);
        // listRef = createRTDBConversation(roomID, socket.id, "socket Setup");

        // listRef?.on("child_added", (data) => {
        //     console.log(data.key, data.val());
        //     // console.log(listRef.parent?.key);
        //     // const retVal = listRef.
        // });

        socket.on('disconnect', (reason: string) => {
            console.log(socket.id, "has disconnected for the following reason: ", reason);
            socket.to(roomID).broadcast.emit('user-disconnected', myPeerID)
        });
    });
};


export {
    setUpSocketIOServer
}