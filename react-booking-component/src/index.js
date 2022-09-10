import React from 'react';
import BookRoomForm from "./lib/components/BookRoomForm";
import store from "./lib/store";
import {Provider} from "react-redux";
import {render} from "react-dom";

const App = () => (
    <Provider store={store}>
        <BookRoomForm/>
    </Provider>
);

render(<App/>, document.getElementById("root"));
