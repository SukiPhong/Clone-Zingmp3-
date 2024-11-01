import { SlActionUndo } from 'react-icons/sl';
import actionTypes from '../actions/actionTypes.js';
const initialState = {
    banner: [],
    friday: {},
    chill: {},
    top100: {},
    albumHot: {},
    isLoading: false,
    newRelease: {},
    weekChart: [],
    chart: {},
    rank: [],
    livestream: [],
};
const appReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner:
                    action.homeData?.find((item) => item.sectionId === 'hSlider')
                        ?.items || null,
                friday:
                    action.homeData?.find((item) => item.sectionId === 'hEditorTheme1') ||
                    {},
                chill:
                    action.homeData?.find((item) => item.sectionId === 'hEditorTheme') ||
                    {},
                top100: action.homeData?.find((item) => item.sectionId === 'h100') || {},
                albumHot:
                    action.homeData?.find((item) => item.sectionId === 'hAlbum') || {},
                newRelease:
                    action.homeData?.find((item) => item.sectionType === 'new-release') ||
                    {},
                weekChart:
                    action.homeData?.find((item) => item.sectionType === 'weekChart')
                        ?.items || [],
                chart:
                    action.homeData?.find((item) => item.sectionId === 'hZC')?.chart ||
                    {},
                rank:
                    action.homeData?.find((item) => item.sectionId === 'hZC').items || [],
                livestream:
                    action.homeData?.find((item) => item.sectionId === 'hLiveRadio')
                        .items || [],
            };

        case actionTypes.Loading:
            return {
                ...state,
                isLoading: action.flag,
            };
        default:
            return state;
    }
};
export default appReducers;
