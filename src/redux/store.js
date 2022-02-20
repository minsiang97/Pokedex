import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducer";
import ReduxThunk from 'redux-thunk'
import devToolsEnhancer from 'remote-redux-devtools';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/index'

let composeEnhancers = compose

if (__DEV__){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export default store