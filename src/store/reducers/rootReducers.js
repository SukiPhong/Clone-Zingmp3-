
import appReducers from "./appReducers.js";
import { combineReducers } from "redux";
import {persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import musicReducers from './musicReducres';
const persistConfig = {
    storage:storage,
    stateReconciler:autoMergeLevel2

}
const musicConfig = {
    ...persistConfig,
    key:'music',
    whitelist:['curSongID']
}
const rootReducers = combineReducers({
    app:appReducers,
    music:persistReducer(musicConfig,musicReducers),    
})
export default rootReducers
