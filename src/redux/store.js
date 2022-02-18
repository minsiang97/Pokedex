import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducer";
import ReduxThunk from 'redux-thunk'
import devToolsEnhancer from 'remote-redux-devtools';

let composeEnhancers = compose

if (__DEV__){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}


const store = createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(ReduxThunk))
)

export default store