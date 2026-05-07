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

    io.on(
        "connection",
        (socket) => {

            console.log(
                "connected"
            );

            socket.on(
                "send-message",
                (data) => {

                    io.emit(
                        "receive-message",
                        data
                    );
                }
            );
        }
    );

    httpServer.listen(
        3000,
        () => {

            console.log(
                "running..."
            );
        }
    );
});