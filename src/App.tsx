import React from 'react';
import './App.css';
import Main from "./Main";
import {DisplayProvider} from "./util/DisplayContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./authentication/Login";
import {Logout} from "./authentication/Logout";
import Introduction from "./pages/Introduction";
import {BatchProvider} from "./util/BatchProvider";
import {
    APP_BATCH_LABELING,
    APP_BATCH_LABELING_PATH,
    APP_INDEX,
    APP_LOGIN,
    APP_LOGOUT
} from "./constants/Urls";
import {AuthenticationProvider} from "./authentication/AuthenticationProvider";

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <DisplayProvider>
                    <BrowserRouter basename={APP_INDEX}>
                        <Routes>
                            <Route path={APP_LOGIN} element={<Login/>}/>
                            <Route path={APP_LOGOUT} element={<Logout/>}/>
                            <Route path={APP_INDEX} element={<AuthenticationProvider/>}>
                                <Route path={APP_INDEX} element={<Introduction/>}/>
                                <Route path={APP_BATCH_LABELING_PATH} element={<BatchProvider/>}>
                                    <Route path={APP_BATCH_LABELING()} element={<Main/>}/>
                                </Route>
                            </Route>
                            <Route path="*" element={<p>There's nothing here: 404!</p>} />
                        </Routes>
                    </BrowserRouter>
                </DisplayProvider>
            </header>
        </div>
    );
}

export default App;
