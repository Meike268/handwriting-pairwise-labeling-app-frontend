import React from "react";
import {useCookies} from "react-cookie";
import {Navigate} from "react-router-dom";


export const Logout: React.FC = () => {
    const [, , removeCookie] = useCookies(['user'])

    removeCookie("user")

    return <Navigate to={"/"}/>
}