import React from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Route, Routes} from 'react-router-dom'
import NotFoundPage from "./components/views/NotFoundPage";
import HomePage from "./components/views/HomePage";
import {useAuth0} from "@auth0/auth0-react";
import Loading from "./components/base/Loading";

function App() {
    const {isLoading, error} = useAuth0();
    if (error) {
        return <div>Oops... {error.message}</div>;
    }
    if (isLoading) {
        return <Loading/>;
    }
    return (
        <Routes>
            <Route index element={<HomePage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
}

export default App;
