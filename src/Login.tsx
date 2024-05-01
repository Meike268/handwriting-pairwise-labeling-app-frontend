import React, {createContext, ReactNode, useState} from "react";
import {useCookies} from "react-cookie";

type User = {name: string}
export const UserContext = createContext<User | undefined>(undefined);

export const Login: React.FC<{ children: ReactNode }> = ({children}) => {
    const [cookies, setCookie] = useCookies(['user'])
    const [user, setUser] = useState<User | undefined>(cookies.user)

    const [name, setName] = useState<string>("")

    function onSubmit() {
        const newUser = {name: name}
        setUser(newUser)
        setCookie("user", newUser)
    }

    if (user === undefined) {
        return <div>
            Name:&nbsp;
            <input onChange={e => setName(e.target.value)}/>
            <br/>
            <button onClick={() => onSubmit()} type="submit" style={{padding: "10px", marginTop: "10px", width: "100%"}}>Bestätigen</button>
        </div>
    } else {
        return <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    }
}