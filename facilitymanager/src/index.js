import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from './store'
import {Auth0Provider} from "@auth0/auth0-react";
import {history} from "./utils/history";
import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <HistoryRouter history={history}>
            <Auth0Provider
                domain="bookaroom-fon.eu.auth0.com"
                clientId="pzQzQA9sAuIZz3740i2k9w5CaKe5bHwq"
                redirectUri={window.location.origin + "/callback"}
                audience="https://bookaroom-fon.eu.auth0.com/api/v2/"
                scope="read:current_user update:current_user_metadata update:current_user_metadata create:current_user_metadata">
                <App/>
            </Auth0Provider>
        </HistoryRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();