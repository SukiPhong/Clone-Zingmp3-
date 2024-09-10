import actionTypes from "../actions/actionTypes.js";
const initialState = {
    curSongID: null,
    isPlaying: false,
};
const musicReducers = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                curSongID: action.sid || null
            }
        case actionTypes.PLAY:
            return {
                ...state,
                isPlaying: action.flag || false
            }
        default:
            return state;
    }
}
export default musicReducers;