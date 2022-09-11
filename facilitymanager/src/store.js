import {combineReducers} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import sagas from './redux/sagas'
import {history} from "./utils/history"
import {reducer as reduxFormReducer} from "redux-form";
import {modalReducer} from "react-booking-facility-component/dist/lib/reducers/modalReducer";
import {AppReducer} from "react-booking-facility-component/dist/lib/reducers/reducer";

const reducers = combineReducers({
    app: AppReducer,
    form: reduxFormReducer,
    modalDialog: modalReducer
})
let middlewares = [];
// add the saga middleware
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

const store = configureStore({
    reducer: reducers, middleware: middlewares
});

sagaMiddleware.run(sagas, history);

export default store;