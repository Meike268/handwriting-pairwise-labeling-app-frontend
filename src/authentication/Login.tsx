import React, {useState} from "react";
import {useCookies} from "react-cookie";
import {Navigate, useNavigate} from "react-router-dom";
import {APP_INDEX, BACKEND_LOGIN} from "../constants/Urls";

export type Me = {
    username: string,
    auth_token: string,
}


export const Login: React.FC = () => {

    const [user, setUser] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string | undefined>(undefined)
    const navigate = useNavigate();

    const [cookie, setCookie] = useCookies(['me'])

    async function onSubmit() {
        const basic_auth_token = window.btoa(user + ":" + password)
        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Content-Type', 'application/json');
        requestHeaders.set('Authorization', `Basic ${basic_auth_token}`)

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: requestHeaders
        };
        const res = await fetch(BACKEND_LOGIN, requestOptions)
        if (res.status === 200) {
            const user = await res.json()
            const me: Me = {auth_token: basic_auth_token, username: user.username}

            setCookie("me", me)
            navigate(APP_INDEX)
        }
        else if (res.status === 401)
            setError("Incorrect credentials")
        else if (res.status === 404)
            setError(`Could not log in at ${BACKEND_LOGIN}. Is login-endpoint running at that address?`)
        else
            setError(`Unknown errorcode: ${res.status}`)
    }

    if (cookie.me !== undefined)
        return <Navigate to={APP_INDEX}/>
    return <div>
        <div>
            <h1 style={{
                height: "min-content",
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "60%"
            }}>Willkommen</h1>
            <p className={"basic-long-text-div"} style={{
                marginLeft: "auto",
                marginRight: "auto"
            }}>
                Diese Website ist Teil der Abschlussarbeiten von Lukas Pieger und Erik Schmidt.
                In Zusammenarbeit mit Stabilo und dem xAI Lehrstuhl wollen wir die Handschrift von Schülern
                automatisiert bezüglich ihrer Leserlichkeit bewerten. Dazu haben wir von etwa 200 Schülern dieselben 10
                Sätze aufgezeichnet. Zweck dieser Website ist es, deine Einschätzung zur Leserlichkeit einzelner Sätze zu
                sammeln. Diese Bewertungen dienen später als Grundlage (Trainings-Beispiele) für KI-Modelle, die
                Handschrift möglichst so bewerten sollen, wie Menschen das tun.
                <br/>
                <br/>
                Bitte melde dich mit den Daten an, die wir dir geschickt haben. Danach geht es direkt los.
                Falls du keine Login-Daten hast und gerne helfen willst, melde dich
                bei hw-labeling-app@beispiel.de.
            </p>
        </div>
        <div className={"grid-container"} style={{
            maxWidth: "30%",
            minWidth: "300px",
            marginLeft: "auto",
            marginRight: "auto"
        }}>
            <div style={{gridRowStart: "row-start 1", justifySelf: "start", margin: "10px"}}>
                Name:
            </div>
            <input value={user} onChange={e => setUser(e.target.value)}
                   style={{gridRowStart: "row-start 1"}}/>
            <div style={{gridRowStart: "row-start 2", justifySelf: "start", margin: "10px"}}>
                Passwort:
            </div>
            <input type={"password"} value={password} onChange={e => setPassword(e.target.value)}
                   style={{gridRowStart: "row-start 2"}}/>
            <br/>
        </div>
        <div style={{color: "red"}}>{error}</div>
        <button onClick={() => onSubmit()} type="submit"
                style={{
                    padding: "10px",
                    marginTop: "10px",
                    maxWidth: "30%",
                    minWidth: "300px"
                }}>Bestätigen
        </button>
    </div>
}