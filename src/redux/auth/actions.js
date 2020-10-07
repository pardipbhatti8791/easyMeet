import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    AUTH_SPINNING,
    USER_LOADED,
    AUTH_ERROR
} from './types';
import { gpAxios } from '~/utils/gpAxios';
import { apiPaths } from '../../utils/apiPaths';
import { setUserToken } from '../../utils/gpAxios';
import swal from '@sweetalert/with-react';
import { errorAlert } from '../../utils/sweetAlert';

/**
 *
 * @param data
 * @returns {{payload: *, type: string}}
 */
export const authSpinner = data => {
    return {
        type: AUTH_SPINNING,
        payload: data
    };
};

/**
 *
 * @param email
 * @param password
 * @param history
 * @returns {function(...[*]=)}
 */
export const loginUser = (email, password, history = null) => async dispatch => {
    dispatch(authSpinner(true));
    const data = {
        email: email,
        password: password,
        device_token: 'dfsdfhsfhkdddssjsdfh'
    };
    try {
        const response = await gpAxios.post('/login', data);
        setUserToken(response.data.data.result.auth_user_token);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data.data.result.auth_user_token
        });
        dispatch(loadUserPostAuthentication(response.data.data.result.auth_user_token));
    } catch (error) {
        dispatch(authSpinner(false));

        errorAlert({ message: error.response.data.message });
        dispatch({
            type: LOGIN_FAILED
        });
    }
};

/**
 *
 * @param {*} data
 */
export const signUpRequest = (data, history) => dispatch => {
    dispatch(authSpinner(true));
    gpAxios
        .post(apiPaths.user_management.signUp, data)
        .then(response => {
            if (response.data.status) {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: response.data.data.result.auth_user_token
                });
                dispatch(loadUserPostAuthentication(response.data.data.result.auth_user_token, history));
            }
        })
        .catch(e => {
            dispatch(authSpinner(false));
            errorAlert(e.response.data.errors);
        });
};

/**
 *
 * @param token
 * @returns {function(...[*]=)}
 */
export const loadUser = (token = null) => async dispatch => {
    try {
        const res = await gpAxios.get('/meeter/me');
        dispatch({
            type: USER_LOADED,
            payload: {
                user: res.data.data.result
            }
        });
        dispatch(authSpinner(false));
    } catch (e) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};

export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    });
};

/**
 *
 * @param token
 * @returns {function(...[*]=)}
 */
export const loadUserPostAuthentication = (token = null, history) => async dispatch => {
    try {
        const res = await gpAxios.get('/meeter/me', {
            headers: {
                'User-key': token
            }
        });
        dispatch({
            type: USER_LOADED,
            payload: {
                user: res.data.data.result
            }
        });
        dispatch(authSpinner(false));
        window.location.href = '/dashboard';
    } catch (e) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};
