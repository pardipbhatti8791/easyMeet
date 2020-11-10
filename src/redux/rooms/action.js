import { SET_TOKEN_SUCCESS } from './type';
import { TWILIO_LOGOUT } from './type';
import { gpAxios } from '../../utils/gpAxios';
import { apiPaths } from '../../utils/apiPaths';

/*

get access token from twilio
@params roomName identity
*/
export const getAccessToken = (roomName, identity) => async dispatch => {
    try {
        const response = await gpAxios.get(
            `/meeter/video/get-access-token\?identity=${identity}&room_name=${roomName}`
        );

        dispatch({
            type: SET_TOKEN_SUCCESS,
            payload: response.data.data.result.access_token
        });

        return response;
    } catch (e) {
        console.log(e);
    }
};

/*

set access token 
@params token
*/
export const setAccessToken = data => async dispatch => {
    try {
        dispatch({
            type: SET_TOKEN_SUCCESS,
            payload: data
        });
    } catch (e) {
        console.log(e);
    }
};

/*

twilio logout

*/
export const twilioLogout = () => dispatch => {
    dispatch({
        type: TWILIO_LOGOUT
    });
};

/*

set meeting status
@params data as meeting status
*/

export const meetingStatus = data => async => {
    try {
        const response = gpAxios.post(apiPaths.change_meeting_status, data);
        return response;
    } catch (e) {
        console.log(e.response.data.errors);
    }
};

/*

get meeting room status from twilio
@params roomName
*/
export const getMeetingRoomStatus = roomName => async => {
    console.log('room status');
    try {
        const response = gpAxios.get(`/check-room-status?room_name=${roomName}`);
        return response;
    } catch (err) {
        console.log(err.response.data.errors);
    }
};
