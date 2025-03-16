import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import {createServer} from "http";

const app = express();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
}));


const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
})

app.get("/", (req, res) => {
    res.send("Hello World");
}); 

io.on("connection", (socket) => {
    console.log("User connected", socket.id);
    socket.on("message", (data) => {
        console.log(data);
        io.emit("receive-message", data);
      
    });
    // socket.emit(`welcome", "welcome to the server${socket.id}`);
  
});


server.listen(3000, () => {
    console.log("http://localhost:3000");
});