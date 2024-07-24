import React from 'react';
import './App.css';
import {AuthenticationProvider} from "./authentication/AuthenticationProvider";
import Main from "./Main";
import {DisplayProvider} from "./util/DisplayContext";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./authentication/Login";
import {Logout} from "./authentication/Logout";

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
