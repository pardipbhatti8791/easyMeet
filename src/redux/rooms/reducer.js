import { SET_TOKEN_SUCCESS } from './type';

const intialState = {
    // token: localStorage.getItem('twilioacesstoken') != null ? localStorage.getItem('twilioacesstoken') : null

    token: localStorage.getItem('twilioacesstoken') == null ? null : localStorage.getItem('twilioacesstoken')
};

export default (state = intialState, actions) => {
    switch (actions.type) {
        case SET_TOKEN_SUCCESS:
            return {
                ...state,
                token: actions.payload
            };
        default:
            return state;
    }
};
