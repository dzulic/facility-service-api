import {combineReducers} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import {AppReducer} from './reducers/reducer'
import {modalReducer} from './reducers/modalReducer'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'
import {history} from "./utils/history"
import {reducer as reduxFormReducer} from "redux-form";

const reducers = combineReducers({
    app: AppReducer,
    modalDialog: modalReducer,
    form: reduxFormReducer
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