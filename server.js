const { Server } = require("socket.io");
const httpServer = require("http").createServer();

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("connected:", socket.id);

    socket.on("join", (userId) => {
        socket.join(userId);
    });

    socket.on("send-message", (data) => {
        io.to(data.receiId.toString()).emit("receive-message", data);
        io.to(data.senderId.toString()).emit("receive-message", data);
    });

    socket.on("disconnect", () => {
        console.log("disconnected:", socket.id);
    });
});

httpServer.listen(3001, () => {
    console.log("Socket.IO running on port 3001");
});