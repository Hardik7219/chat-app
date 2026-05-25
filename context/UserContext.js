'use client'

import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import { getSocket } from "@/lib/socket";

const UserContext =
    createContext();

export function UserProvider({
    children
}) {

    const [user, setUser] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        async function getUser() {

            try {

                const res =
                    await fetch(
                        "/api/profile"
                    );

                const data =
                    await res.json();

                if (data.loggedIn) {
                    setUser(data.user);
                    getSocket().emit("join", data.user.id.toString());
                }

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        }

        getUser();

    }, []);

    return (

        <UserContext.Provider
            value={{
                user,
                setUser,
                loading
            }}
        >

            {children}

        </UserContext.Provider>
    );
}

export function useUser() {

    return useContext(
        UserContext
    );
}