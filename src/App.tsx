import React from 'react';
import './App.css';
import {Login} from "./Login";
import Main from "./Main";

const App: React.FC = () => {

    return (
        <div className="App">
            <header className="App-header">
                <Login>
                    <Main/>
                </Login>
            </header>
        </div>
    );
}

export default App;
