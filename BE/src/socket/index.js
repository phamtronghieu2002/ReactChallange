import { Server } from "socket.io";
import http from "http";
import { config } from "dotenv";
import env from "~/config/env";
const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});


const socket = () => {



    let users = [];


    const addUser = (userId, socketId) => {
        !users.some(user => user.userId === userId) && users.push({ userId, socketId })
    }


    const getUser = (userId) => {
        return users.find((user) => user.userId == userId)
    }

    const removeUser = (socketId) => {
        users = users.filter((user) => user.socketId !== socketId)
    }

    io.on("connection", (socket) => {

        socket.on("addUser", (userId) => {

            addUser(userId, socket.id)
            console.log("users  connect >>>", users);


        })

        socket.on("handleGetUsers", (value) => {

        })

        socket.on("sendMessage", (data) => {
            console.log("data >>>", data);
            const { receiverId } = data;
            const receiver = getUser(receiverId)
            console.log("receiver >>>", receiver);

            if (receiver) {

                io.to(receiver.socketId).emit("getMessages", data)

            }


        })





        socket.on("disconnect", () => {
            removeUser(socket.id)
            console.log("users  disconnect >>>", users);
        })




    });

    const socketPort = env.LOCAL_APP_PORT_SOCKET || 8888;

    server.listen(socketPort, () => {
        console.log("socket server is running on port:", socketPort);
    });







}



export default socket;