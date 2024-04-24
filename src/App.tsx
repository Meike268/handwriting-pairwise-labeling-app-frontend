import React from 'react';
import './App.css';
import {Login} from "./Login";
import Main from "./Main";

const App: React.FC = () =>  {

  return (
    <div className="App">
      <Login>
        <Main/>
      </Login>
    </div>
  );
}

export default App;
