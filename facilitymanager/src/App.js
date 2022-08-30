import React from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Route, Routes, unstable_HistoryRouter as HistoryRouter} from 'react-router-dom'
import NotFoundPage from "./components/views/NotFoundPage";
import HomePage from "./components/views/HomePage";
import {history} from "./utils/history";
import {useAuth0} from "@auth0/auth0-react";
import UpdateUserModal from "./components/views/auth/UpdateUserModal";
import Loading from "./components/base/Loading";
import Profile from "./components/views/auth/ProfileForm";

function App() {
    const {isLoading, error} = useAuth0();
    if (error) {
        return <div>Oops... {error.message}</div>;
    }
    if (isLoading) {
        return <Loading/>;
    }
    return (<div className="App">
        <HistoryRouter history={history}>
            <Routes>
                <Route index element={<HomePage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/sign-up" element={<UpdateUserModal/>}/>
            </Routes>
        </HistoryRouter>
    </div>);
}

export default App;
