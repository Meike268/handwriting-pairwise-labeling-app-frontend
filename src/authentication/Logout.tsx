import React from "react";
import {useCookies} from "react-cookie";
import {Navigate} from "react-router-dom";
import {APP_INDEX} from "../constants/Urls";


export const Logout: React.FC = () => {
    const [, , removeCookie] = useCookies(['me'])

    removeCookie("me")

    return <Navigate to={APP_INDEX}/>
}