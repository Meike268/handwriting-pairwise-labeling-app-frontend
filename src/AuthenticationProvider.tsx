import React, {createContext, ReactNode} from "react";
import {useCookies} from "react-cookie";
import {Navigate} from 'react-router-dom';

type User = {name: string}
export const UserContext = createContext<User | undefined>(undefined);

export const AuthenticationProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [cookies,] = useCookies(['user'])
    const user = cookies.user

    if (user === undefined) {
        return <Navigate to="/login" replace />
    } else {
        return <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    }
}