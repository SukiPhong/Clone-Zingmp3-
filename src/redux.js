import rootReducers from "./store/reducers/rootReducers";
import { applyMiddleware, createStore } from "redux";
import {thunk} from 'redux-thunk';
import { persistStore } from "redux-persist";

const reduxConfig = () => {
    const store = createStore(rootReducers, applyMiddleware(thunk));
    const persistor =persistStore(store)
    return {store,persistor};
};

export default reduxConfig;
