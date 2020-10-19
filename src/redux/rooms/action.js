import { SET_TOKEN_SUCCESS } from './type';
import { TWILIO_LOGOUT } from './type';
import { gpAxios } from '../../utils/gpAxios';
import axios from 'axios';
export const getAccessToken = (roomName, identity) => async dispatch => {
    try {
        console.log('action fired for twilio', roomName);
        const response = await gpAxios.get(
            `/meeter/video/get-access-token\?identity=${identity}&room_name=${roomName}`
        );
        console.log('actiohn');
        dispatch({
            type: SET_TOKEN_SUCCESS,
            payload: response.data.data.result.access_token
        });

        return response;
    } catch (e) {
        console.log(e);
    }
};

export const setAccessToken = data => async dispatch => {
    console.log('setaccestoken dispatch');
    try {
        dispatch({
            type: SET_TOKEN_SUCCESS,
            payload: data
        });
    } catch (e) {
        console.log(e);
    }
};

export const twilioLogout = () => dispatch => {
    console.log('twilio logout action');
    dispatch({
        type: TWILIO_LOGOUT
    });
};
