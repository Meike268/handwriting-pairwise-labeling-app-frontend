import React from 'react';
import './App.css';
import {AuthenticationProvider} from "./AuthenticationProvider";
import Main from "./Main";
import {DisplayProvider} from "./DisplayContext";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./Login";
import {Logout} from "./Logout";

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <DisplayProvider>
                    <BrowserRouter basename={"/"}>
                        <Routes>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/logout" element={<Logout/>}/>
                            <Route path={"/"} element={
                                <AuthenticationProvider>
                                    <Main/>
                                </AuthenticationProvider>
                            }/>
                            <Route path="*" element={<Navigate to="/" replace />}/>
                        </Routes>
                    </BrowserRouter>
                </DisplayProvider>
            </header>
        </div>
    );
}

export default App;
