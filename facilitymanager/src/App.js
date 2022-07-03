import React from 'react';
import logo from './logo.png';
import './App.css';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
            </header>
            <Calendar></Calendar>
        </div>
    );
}

export default App;
