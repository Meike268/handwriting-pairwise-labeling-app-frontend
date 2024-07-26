import React, {createContext, ReactNode} from "react";
import {useCookies} from "react-cookie";
import {Navigate, Outlet} from 'react-router-dom';
import {Me} from "./Login";
import {APP_LOGIN} from "../constants/Urls";

export const UserContext = createContext<Me | undefined>(undefined);

export const AuthenticationProvider: React.FC<{ children?: ReactNode }> = ({children}) => {
    const [cookies,] = useCookies(['me'])
    const me: Me = cookies.me

    if (me === undefined) {
        return <Navigate to={APP_LOGIN} replace />
    } else {
        return <UserContext.Provider value={me}>
            {children ? children : <Outlet />}
        </UserContext.Provider>
    }
}