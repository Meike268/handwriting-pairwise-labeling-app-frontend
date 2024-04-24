import React, {useContext} from "react";
import {UserContext} from "./Login";
import logo from "./logo.svg";

const Main: React.FC = () => {
    const user = useContext(UserContext)

    return <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
            Hello {user?.name}
        </p>
        <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
        >
            Learn React
        </a>
    </header>
}

export default Main;