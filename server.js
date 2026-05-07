const { createServer } =
    require("http");

const next = require("next");

const { Server } =
    require("socket.io");

const dev =
    process.env.NODE_ENV !==
    "production";

const app = next({ dev });

const handler =
    app.getRequestHandler();

app.prepare().then(() => {

    const httpServer =
        createServer(handler);

    const io =
        new Server(httpServer);

    io.on("connection", (socket) => {
    console.log("connected:", socket.id);

    // Client joins a room based on their userId
    socket.on("join", (userId) => {
        socket.join(userId);
        console.log(`${userId} joined their room`);
    });

    socket.on("send-message", (data) => {
        // Only emit to sender and receiver's rooms
        io.to(data.receiId.toString()).emit("receive-message", data);
        io.to(data.senderId.toString()).emit("receive-message", data);
    });

    socket.on("disconnect", () => {
        console.log("disconnected:", socket.id);
    });
});

    httpServer.listen(
        3000,
        () => {

            console.log(
                "running..."
            );
        }
    );
});