import React, {useState} from "react";
import {useCookies} from "react-cookie";
import {Navigate, useNavigate} from "react-router-dom";
import {BACKEND_LOGIN} from "./constants/Urls";


export const Login: React.FC = () => {
    const [user, setUser] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string | undefined>(undefined)
    const  navigate = useNavigate();

    const [cookie, setCookie] = useCookies(['user'])

    async function onSubmit() {
        const basic_auth_encoded = window.btoa(user + ":" + password)
        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Content-Type', 'application/json');
        requestHeaders.set('Authorization', `Basic ${basic_auth_encoded}`)

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: requestHeaders
        };
        const res = await fetch(BACKEND_LOGIN, requestOptions)
        if (res.status === 200) {
            setCookie("user", res.ok)
            navigate("/")
        }
        else if (res.status === 401)
            setError("Incorrect credentials")
        else if (res.status === 404)
            setError(`Could not log in at ${BACKEND_LOGIN}. Is login-endpoint running at that address?`)
        else
            setError(`Unknown errorcode: ${res.status}`)
    }

    if (cookie.user !== undefined)
        return <Navigate to={"/"}/>
    return <div>
        <div style={{display: "grid"}}>
            <div style={{gridRowStart: "row-start 1", justifySelf: "start", margin: "10px"}}>
                Name:
            </div>
            <input value={user} onChange={e => setUser(e.target.value)}
                   style={{gridRowStart: "row-start 1"}}/>
            <div style={{height: "5px", gridRowStart: "row-start 2"}}/>
            <div style={{gridRowStart: "row-start 3", justifySelf: "start", margin: "10px"}}>
                Passwort:
            </div>
            <input type={"password"} value={password} onChange={e => setPassword(e.target.value)}
                   style={{gridRowStart: "row-start 3"}}/>
            <br/>
        </div>
        <div style={{color: "red"}}>{error}</div>
        <button onClick={() => onSubmit()} type="submit"
                style={{padding: "10px", marginTop: "10px", width: "100%"}}>Bestätigen
        </button>
    </div>
}