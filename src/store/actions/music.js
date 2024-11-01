import * as apis from '../../apis';
import actionTypes from './actionTypes';

export const setCurrentSongId = (songId) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    songId,
});
export const play = (flag) => ({
    type: actionTypes.PLAY,
    flag,
});
export const Album = (flag) => ({
    type: actionTypes.SET_AlBUM,
    flag,
});
export const setPlayList = (Songs) => ({
    type: actionTypes.PLAYLIST,
    Songs,
});

export const LoadingPage = (flag) => ({
    type: actionTypes.Loading,
    flag,
});
export const setCurrentSongData = (data) => ({
    type: actionTypes.SET_CUR_SONG_DATA,
    data,
});
export const setCurAlbumId = (pid) => ({
    type: actionTypes.SET_CUR_ALBUM_ID,
    pid,
});
export const setRecentSongs = (Song) => ({
    type: actionTypes.SET_RECENT,
    Song,
});
export const search = (keyword) => async (dispatch) => {
    try {
        const response = await apis.apiSearch(keyword);
        if (response.data.err === 0) {
            dispatch({
                type: actionTypes.SEARCH,
                data: response?.data?.data,
                keyword,
            });
        } else {
            dispatch({
                type: actionTypes.SEARCH,
                songs: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.SEARCH,
            songs: null,
        });
    }
};

export const getSearchSongs = (singerId) => async (dispatch) => {
    try {
        const response = await apis.apiGetDetailPlaylist(singerId);
        if (response.data.err === 0) {
            dispatch({
                type: actionTypes.PLAYLIST,
                Songs: response?.data?.data.song.items,
            });
        } else {
            dispatch({
                type: actionTypes.PLAYLIST,
                Songs: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.PLAYLIST,
            Songs: null,
        });
    }
};
