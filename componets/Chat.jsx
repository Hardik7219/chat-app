import socket from "@/lib/socket";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

function Chat({ id }) {
    const [messages, setMessages] = useState([]);
    const { user } = useUser();

    // Join your personal room once
    useEffect(() => {
        if (!user?.id) return;
        socket.emit("join", user.id);
    }, [user?.id]);

    // Load messages
    useEffect(() => {
        if (!user?.id) return;
        const loadMsg = async () => {
            const res = await fetch("/api/message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ myId: user.id, otherId: id }),
            });
            const data = await res.json();
            setMessages(data.messages);
        };
        loadMsg();
    }, [user?.id, id]);

    // Listen for messages — fixed listener
    useEffect(() => {
        if (!user?.id) return;

        const handleMessage = (data) => {
            setMessages((prev) =>
                prev.some((msg) => msg._id === data._id)
                    ? prev
                    : [...prev, data]
            );
        };

        socket.on("receive-message", handleMessage);
        return () => socket.off("receive-message", handleMessage); // ✅ clean
    }, [user?.id, id]);

    return (
        <div className="bg-rose-600 text-white w-auto h-screen overflow-y-auto">
            {messages.map((msg) => (
                <div
                    key={msg._id}
                    className={`flex mb-2 ${
                        msg.senderId.toString() === user?.id
                            ? "justify-end"
                            : "justify-start"
                    }`}
                >
                    <div
                        className={`p-3 rounded-2xl max-w-[250px] ${
                            msg.senderId.toString() === user?.id
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-black"
                        }`}
                    >
                        {msg.message}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Chat;