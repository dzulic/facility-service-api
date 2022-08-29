import React from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Route, Routes, unstable_HistoryRouter as HistoryRouter} from 'react-router-dom'
import NotFoundComponent from "./components/pages/NotFoundComponent";
import HomeComponent from "./components/pages/HomeComponent";
import RoomOverviewComponent from "./components/pages/RoomOverviewComponent";
import {history} from "./redux/history";

function App() {
    return (
        <div className="App">
            <HistoryRouter history={history}>
                <Routes>
                    <Route index element={<HomeComponent/>}/>
                    <Route path="rooms" element={<RoomOverviewComponent/>}/>
                    <Route path="*" element={<NotFoundComponent/>}/>
                </Routes>
            </HistoryRouter>
        </div>
    );
}

export default App;
