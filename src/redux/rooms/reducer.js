import { SET_TOKEN_SUCCESS } from './type';
import { TWILIO_LOGOUT } from './type';

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
        case TWILIO_LOGOUT:
            return {
                ...state,
                token: null
            };
        default:
            return state;
    }
};
