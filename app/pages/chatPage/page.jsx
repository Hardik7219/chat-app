'use client'
import Chat from '@/componets/Chat'
import { Search, Send } from 'lucide-react';
import Link from 'next/link'
import {
    useSearchParams
} from "next/navigation";
import {
    useUser
} from "@/context/UserContext";
import socket
    from "@/lib/socket";
import React, { useState,useEffect } from 'react'

function Chatpage() {
    const searchParams = useSearchParams();
    const [chat, setChat] = useState();
    const id = searchParams.get('id')
    const name = searchParams.get('name')
    const {
        user,
        loading
    } = useUser();
    const sendChat = async (e) => {
        e.preventDefault();

        if (!chat.trim()) return;
        const res = await fetch('/api/sendChat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: user.id,
                id: id,
                msg: chat
            })
        })
        const data = await res.json();
        socket.emit(
            "send-message",
            data.data
        );
        setChat("");
    }

useEffect(() => {
    if (!user?.id) return;
    socket.emit("join", user.id);
}, [user?.id]);

    return (
        <>
        <div className='z-40 w-full sticky top-0'>

            <div className='w-full h-10 p-2 bg-indigo-950 flex items-center'>
                <Link href="/pages/dashboard" className='text-2xl font-extrabold '>Back</Link>
            </div>
            <div className=''>
                <div className='flex items-center bg-blue-950 p-2 border-t-2'>
                    <div className='text-lg font-bold'>{name}</div>
                </div>
            </div>
        </div>
        <div className=''>            
        <div>
            <Chat id={id}></Chat>
        </div>
        </div>

            <div className='z-50 w-full sticky bottom-0'>
                <form className='p-1 w-full' onSubmit={sendChat}>
                    <div className='border-2 rounded-lg border-[#8707ff] justify-between flex'>
                        <input className='s-input w-[90%] rounded-0'  value={chat || ""} onChange={(e) => setChat(e.target.value)} type="text" placeholder='Your message'></input>
                        <button type="submit" className='s-btn w-[10%] flex justify-center items-center'><Send></Send></button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Chatpage
