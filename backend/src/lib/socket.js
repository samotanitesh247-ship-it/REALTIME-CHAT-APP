import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true
    }    
});

export function getReceiverSocketId(userId) {
    return userSocketsMap[userId];

}

const userSocketsMap = {};

io.on("connection",(socket)=>{
    console.log("new user connected : ", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId){ 
        userSocketsMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketsMap));

    // WebRTC Signaling
    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        const receiverSocketId = getReceiverSocketId(userToCall);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("incomingCall", { signal: signalData, from, name });
        }
    });

    socket.on("answerCall", (data) => {
        const receiverSocketId = getReceiverSocketId(data.to);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("callAccepted", data.signal);
        }
    });

    socket.on("iceCandidate", (data) => {
        const receiverSocketId = getReceiverSocketId(data.to);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("iceCandidate", data.candidate);
        }
    });

    socket.on("endCall", ({ to }) => {
        const receiverSocketId = getReceiverSocketId(to);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("callEnded");
        }
    });

    socket.on("disconnect",()=>{
        console.log("user disconnected : ", socket.id);
        delete userSocketsMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketsMap));
    });
});

export {io,server,app};


