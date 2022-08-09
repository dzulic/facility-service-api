import {applyMiddleware, combineReducers} from 'redux'
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import {AppReducer} from './redux/reducer'
import createSagaMiddleware from 'redux-saga'
import sagas from './redux/sagas'

const reducers = combineReducers({
    app: AppReducer
})
let middlewares = [];

// add the saga middleware
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);
const middleware = [...getDefaultMiddleware({thunk: false}), sagaMiddleware];

const store = configureStore({
    reducer: reducers, middleware: middleware
});

sagaMiddleware.run(sagas);

export default store;