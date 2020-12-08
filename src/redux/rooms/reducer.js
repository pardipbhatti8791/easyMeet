import { SET_TOKEN_SUCCESS, HOST_AVAILABLE } from './type';
import { TWILIO_LOGOUT } from './type';

const intialState = {
    // token: localStorage.getItem('twilioacesstoken') != null ? localStorage.getItem('twilioacesstoken') : null

    token: localStorage.getItem('twilioacesstoken') == null ? null : localStorage.getItem('twilioacesstoken'),
    hostAvailable: true
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
        case HOST_AVAILABLE:
            return {
                ...state,
                hostAvailable: actions.payload
            };
        default:
            return state;
    }
};
