const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(async (req, res) => {
        try {
            const parsedUrl = parse(req.url, true);
            await handle(req, res, parsedUrl);
        } catch (err) {
            console.error("Request error:", err);
            res.statusCode = 500;
            res.end("internal server error");
        }
    });

    const io = new Server(httpServer, {
        cors: {
            origin: `http://${hostname}:${port}`,
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        socket.on("join", (userId) => {
            if (!userId) return;
            const room = userId.toString();
            socket.join(room);
            console.log(`Socket ${socket.id} joined room ${room}`);
        });

        socket.on("send-message", (data) => {
            if (!data?.senderId || !data?.receiId) return;
            const payload = {
                ...data,
                _id: data._id?.toString?.() ?? data._id,
                senderId: data.senderId?.toString?.() ?? data.senderId,
                receiId: data.receiId?.toString?.() ?? data.receiId,
            };
            io.to(payload.receiId).emit("receive-message", payload);
            io.to(payload.senderId).emit("receive-message", payload);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        });
    });

    httpServer.listen(port, () => {
        console.log(`> Next.js ready on http://${hostname}:${port}`);
        console.log(`> Socket.IO attached (same port)`);
    });
});
