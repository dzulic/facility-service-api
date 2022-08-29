import {combineReducers} from 'redux'
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {AppReducer} from './redux/reducers/reducer'
import {modalReducer} from './redux/reducers/modalReducer'
import createSagaMiddleware from 'redux-saga'
import sagas from './redux/sagas'
import {history} from "./redux/history"

const reducers = combineReducers({
    app: AppReducer,
    modalDialog: modalReducer
})
let middlewares = [];

// add the saga middleware
const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);
const middleware = [...getDefaultMiddleware({thunk: false}), sagaMiddleware];

const store = configureStore({
    reducer: reducers, middleware: middleware
});

sagaMiddleware.run(sagas, history);

export default store;