import actionTypes from '../actions/actionTypes.js';
const initialState = {
    curSongID: null,
    curSongData: null,
    isPlaying: false,
    at_Album: false,
    Songs: [],
    curAlbumId: null,
    recentSongs: [],
    searchData: {},
    keyword: '',
};
const musicReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                curSongID: action.songId || null,
            };

        case actionTypes.PLAY:
            return {
                ...state,
                isPlaying: action.flag || false,
            };
        case actionTypes.SET_AlBUM:
            return {
                ...state,
                at_Album: action.flag || false,
            };
        case actionTypes.PLAYLIST:
            return {
                ...state,
                Songs: action.Songs || null,
            };
        case actionTypes.SET_CUR_SONG_DATA:
            return {
                ...state,
                curSongData: action.data || null,
            };
        case actionTypes.SET_CUR_ALBUM_ID:
            return {
                ...state,
                curAlbumId: action.pid || null,
            };
        case actionTypes.SET_RECENT:
            let songs = state.recentSongs;
            if (action.Song) {
                if (state.recentSongs?.some((e) => e.sid === action.Song.sid)) {
                    songs = songs.filter((i) => i.sid !== action.Song.sid);
                }
                if (songs.length > 19) {
                    // songs = songs.filter((e, idx, self) => idx !== self.length - 1);
                    songs.pop();
                }
                songs = [action.Song, ...songs];
            }
            return {
                ...state,
                recentSongs: songs,
            };
        case actionTypes.SEARCH:
            return {
                ...state,
                searchData: action.data || null,
                keyword: action.keyword || '',
            };
        default:
            return state;
    }
};

export default musicReducers;
