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
            <div className='w-full h-19 bg-amber-700'>
                <Link href="/pages/dashboard">dashboard</Link>
            </div>
            <div className=''>
                <div className='flex items-center gap-4 border'>
                    <div className='bg-amber-50 rounded-full h-10 w-10'></div>
                    <div>{name}</div>
                </div>
                <div className=''>
                    <div>
                        <Chat id={id}></Chat>
                    </div>
                </div>

            </div>
            <div className='z-50 w-full sticky bottom-0'>
                <form className='p-1 w-full' onSubmit={sendChat}>
                    <div className='border-2 rounded-lg border-[#8707ff] justify-between flex'>
                        <input className='s-input w-[90%] rounded-0' onChange={(e) => setChat(e.target.value)} type="text" placeholder='Search the user...'></input>
                        <button type="submit" className='s-btn w-[10%] flex justify-center items-center'><Send></Send></button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Chatpage
