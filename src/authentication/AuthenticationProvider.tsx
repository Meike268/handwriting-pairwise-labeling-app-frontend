import React, {createContext, ReactNode} from "react";
import {useCookies} from "react-cookie";
import {Navigate} from 'react-router-dom';
import {Me} from "./Login";

export const UserContext = createContext<Me | undefined>(undefined);

export const AuthenticationProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [cookies,] = useCookies(['me'])
    const me: Me = cookies.me

    if (me === undefined) {
        return <Navigate to="/login" replace />
    } else {
        return <UserContext.Provider value={me}>
            {children}
        </UserContext.Provider>
    }
}