
import actionTypes from "../actions/actionTypes.js";
const initialState = {
    banner: [],
};
const appReducers = (state = initialState, action) => {
    switch (action.type) {
    
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionType === 'banner')?.items || null
            
            }
           
        default:
            return state;
    }
}
export default appReducers;