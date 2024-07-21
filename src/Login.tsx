import React, {useState} from "react";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";


export const Login: React.FC = () => {
    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const  navigate = useNavigate();

    const [, setCookie] = useCookies(['user'])

    function onSubmit() {
        const newUser = {name: name}
        setCookie("user", newUser)
        navigate("/")
    }

    return <div>
        <div style={{display: "grid"}}>
            <div style={{gridRowStart: "row-start 1", justifySelf: "start", margin: "10px"}}>
                Name:
            </div>
            <input value={name} onChange={e => setName(e.target.value)}
                   style={{gridRowStart: "row-start 1"}}/>
            <div style={{height: "5px", gridRowStart: "row-start 2"}}/>
            <div style={{gridRowStart: "row-start 3", justifySelf: "start", margin: "10px"}}>
                Passwort:
            </div>
            <input type={"password"} value={password} onChange={e => setPassword(e.target.value)}
                   style={{gridRowStart: "row-start 3"}}/>
            <br/>
        </div>
        <button onClick={() => onSubmit()} type="submit"
                style={{padding: "10px", marginTop: "10px", width: "100%"}}>Bestätigen
        </button>
    </div>
}