import { SET_TOKEN_SUCCESS, HOST_AVAILABLE, SET_MEETING_ROOM, SET_PARTICIPANTS } from './type';
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
    try {
        const response = gpAxios.get(`/check-room-status?room_name=${roomName}`);
        return response;
    } catch (err) {
        console.log(err.response.data.errors);
    }
};

/*
genrate meeting link
@params requester_id and meeting URL


*/

export const createRoom = data => async dispatch => {
    try {
        const response = gpAxios.post('/create_room', data);
        response.then(res => {
            dispatch({
                type: SET_MEETING_ROOM,
                payload: res.data.data.result.meeting_room.name
            });
        });
        return response;
    } catch (err) {
        console.log(err.response.data.errors);
    }
};

export const getRoom = data => async => {
    try {
        const response = gpAxios.get(`/get_room?room_name=${data.signature}&requester_id=${data.requester_id}`);

        return response;
    } catch (err) {
        console.log(err.response.data.errors);
    }
};

export const hostAvailable = data => async dispatch => {
    try {
        dispatch({
            type: HOST_AVAILABLE,
            payload: data
        });
    } catch (e) {
        console.log(e);
    }
};

export const setParticipants = data => async dispatch => {
    
    try {
        dispatch({
            type: SET_PARTICIPANTS,
            payload: data
        });
    } catch (err) {
        console.log(e);
    }
};
