import {
    REGISTER_FAILED,
    REGISTER_SUCCESS,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    AUTH_ERROR,
    LOGOUT,
    AUTH_SPINNING,
    USER_LOADED
} from './types';

const initialState = {
    token: localStorage.getItem('token') !== null ? localStorage.getItem('token') : null,
    isAuthenticated: localStorage.getItem('token') !== null,
    loading: false,
    user: localStorage.getItem('userInfo') !== null ? JSON.parse(localStorage.getItem('userInfo')) : null
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case AUTH_SPINNING:
            return {
                ...state,
                loading: payload,
            };
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload);
            return {
                ...state,
                token: payload.token,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload);
            return {
                ...state,
                token: payload.token,
            };
        case USER_LOADED:
            localStorage.setItem('userInfo', JSON.stringify(payload.user));
            return {
                ...state,
                isAuthenticated: true,
                user: payload.user,
                loading: false
            };
        case REGISTER_FAILED:
        case LOGIN_FAILED:
        case AUTH_ERROR:
            return state
        case LOGOUT:
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        default:
            return state;
    }
};
