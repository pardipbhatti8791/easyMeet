import { apiPaths } from '../../utils/apiPaths';
import { gpAxios } from '../../utils/gpAxios';
import { meeting } from './types';
import { loadUser } from '../auth/actions';

/**
 *
 * @param data
 * @returns {{payload: *, type: string}}
 */
const setMeeterData = (data) => {
    return {
        type: meeting.GET_METER_DATA_SUCCESS,
        payload: data
    }
}

/**
 *
 * @param meeter_id
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export const getMeeterData = meeter_slug => async dispatch => {
    dispatch({
         type: [meeting.GET_METER_DATA_SPINNER_ON]
    })
    dispatch({
         type: [meeting.GET_METER_DATA_INIT]
    })
    try {
        const meeterData = await gpAxios.get(`${apiPaths.user_management.get_meeter_from_slug}${meeter_slug}`);
        dispatch({
            type: [meeting.GET_METER_DATA_SPINNER_OFF]
        })
        dispatch(setMeeterData(meeterData.data.data.result))
    } catch (e) {
        dispatch({
            type: [meeting.GET_METER_DATA_SPINNER_OFF]
        })
        dispatch({
            type: meeting.GET_METER_DATA_FAILED
        })
    }

};


/**
 *
 * @param meeter_id
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export const meetingRequest = (data, history) => async dispatch => {   
    const meeterData = await gpAxios.post(apiPaths.get_meeting_request_url, data);
    return meeterData; 
};

/**
 *
 * @param data
 * @returns {{payload: *, type: string}}
 */
const setMeetingData = (data) => {
    // console.log(data);
    return {
        type: meeting.GET_MEETING_DATA_SUCCESS,
        payload: data
    }
}


/**
 *
 * @param UserKey 
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export const getMeetingList = () => async dispatch => {   
    dispatch({
        type: [meeting.GET_MEETING_DATA_SPINNER_ON]
   })
   dispatch({
        type: [meeting.GET_MEETING_DATA_INIT]
   })
   try {
       const meetingData = await gpAxios.get(`${apiPaths.get_meeting_list}`);
    //    console.log(meetingData.data.data.result.mettings);
       dispatch({
           type: [meeting.GET_MEETING_DATA_SPINNER_OFF]
       })
       dispatch(setMeetingData(meetingData.data.data.result))
   } catch (e) {
       console.log(e);
       dispatch({
           type: [meeting.GET_MEETING_DATA_SPINNER_OFF]
       })
       dispatch({
           type: meeting.GET_MEETING_DATA_FAILED
       })
   } 
};

/**
 *
 * @param file
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export const updateProfilePicture = data => async dispatch => { 
   dispatch({
        type: [meeting.GET_PROFILE_IMAGE_DATA_INIT]
   })
   try {
    const meetingData = await gpAxios.post(apiPaths.user_management.update_profile_pic, data); 
        dispatch({
            type: [meeting.UPLOAD_PROFILE_IMGAE_DATA_SUCESS]
        }) 
        dispatch(loadUser()); 
    } catch (e) {
        console.log(e);
        dispatch({
            type: [meeting.GET_MEETING_DATA_SPINNER_OFF]
        })
        dispatch({
            type: meeting.GET_MEETING_DATA_FAILED
        })
    }  
};