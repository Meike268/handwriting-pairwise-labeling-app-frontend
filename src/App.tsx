import React from 'react';
import './App.css';
import {Login} from "./Login";
import Main from "./Main";
import {DisplayProvider} from "./DisplayContext";

const App: React.FC = () => {

    return (
        <div className="App">
            <header className="App-header">
                <DisplayProvider>
                    <Login>
                        <Main/>
                    </Login>
                </DisplayProvider>
            </header>
        </div>
    );
}

export default App;
