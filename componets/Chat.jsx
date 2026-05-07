'use client'
import React, { useEffect, useState } from 'react'
import {
  useUser
} from "@/context/UserContext";
import socket
  from "@/lib/socket";

function Chat({ id }) {
  const [messages, setMessages] = useState([])

  const {
    user,
    loading
  } = useUser();

  useEffect(() => {
    const loadMsg = async () => {
      const res = await fetch(
        "/api/message",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            myId: user?.id,
            otherId: id,
          }),
        }
      );

      const data = await res.json();

      setMessages(data.messages);
    }
    if (user?.id)
      loadMsg();
  }, [user?.id,id])
  useEffect(() => {

    const handleMessage =
        (data) => {

        if (

            (
                data.senderId.toString() === user?.id &&
                data.receiId.toString() === id
            )

            ||

            (
                data.senderId.toString() === id &&
                data.receiId.toString() === user?.id
            )

        ) {

            setMessages(
                (prev) => {

                    // avoid duplicate
                    const exists =
                        prev.some(
                            (msg) =>
                                msg._id === data._id
                        );

                    if (exists)
                        return prev;

                    return [
                        ...prev,
                        data
                    ];
                }
            );
        }
    };

    // remove old listener first
    socket.off(
        "receive-message",
        handleMessage
    );

    // add listener
    socket.on(
        "receive-message",
        handleMessage
    );

    // cleanup
    return () => {

        socket.off(
            "receive-message",
            handleMessage
        );
    };

}, [user?.id, id]);
  return (
    <>
      <div className='bg-rose-600 text-white w-auto h-screen'>
        {
          messages.map((msg) => (

            <div
              key={msg._id}

              className={`flex mb-2 ${msg.senderId.toString() === user?.id
                  ? "justify-end"
                  : "justify-start"
                }`}
            >

              <div
                className={`p-3 rounded-2xl max-w-[250px] ${msg.senderId.toString() === user?.id
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-black"
                  }`}
              >

                {msg.message}

              </div>

            </div>
          ))
        }
      </div>
    </>
  )
}

export default Chat
