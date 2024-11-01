import * as apis from '../../apis';
import actionTypes from './actionTypes';
export const getHome = () => async (dispatch) => {
    try {
        const rs = await apis.getHome();
        if (rs?.data?.err === 0) {
            dispatch({
                type: actionTypes.GET_HOME,
                homeData: rs.data.data.items,
            });
        } else {
            dispatch({
                type: actionTypes.GET_HOME,
                homeData: null,
            });
        }
    } catch (err) {
        dispatch({
            type: actionTypes.GET_HOME,
            homeData: null,
        });
    }
};
