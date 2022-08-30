import {combineReducers} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import {AppReducer} from './redux/reducers/reducer'
import {modalReducer} from './redux/reducers/modalReducer'
import createSagaMiddleware from 'redux-saga'
import sagas from './redux/sagas'
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