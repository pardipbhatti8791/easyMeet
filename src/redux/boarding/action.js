import { apiPaths } from '../../utils/apiPaths';
import { gpAxios } from '../../utils/gpAxios'; 
import { loadUser } from '../auth/actions';

/**
 *
 * @param {*} data
 */
export const checkSlugAvailability = slug => dispatch => {
    return gpAxios.get(apiPaths.meeter_slug + slug);
};

/**
 *
 * @param slug
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export const updateSlug = slug => dispatch => {
    return gpAxios.put(apiPaths.meeter_slug_update, slug);
};

/**
 *
 * @param bio
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export const updateUserBio = bio => async dispatch  => {
    const updateBio = await gpAxios.put(apiPaths.user_management.update_bio, bio);
    dispatch(loadUser());
    return updateBio;
};


/**
 *
 * @param data
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export const updateAvailability = data => async dispatch => {
    const updateAvailability = await gpAxios.put(apiPaths.user_management.change_availability, data);
    dispatch(loadUser());
    return updateAvailability; 
};

/**
 *
 * @param meeter_id
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export const checkAvailability = meeter_id => dispatch => {
    return gpAxios.get(apiPaths.user_management.check_meeter_availabiliy + meeter_id);
};


/**
 *
 * @param meeter_id
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export const getMeeterData = meeter_slug => async dispatch => {
    console.log("trest",apiPaths.user_management.get_meeter_from_slug + meeter_slug);
    const meeterData = await gpAxios.get(apiPaths.user_management.get_meeter_from_slug + meeter_slug);

    //return meeterData; 
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
 * @param meeter_id
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export const getMeetingList = () => async dispatch => {   
    const meeterList = await gpAxios.get(apiPaths.get_meeting_list);
    return meeterList; 
};

/**
 *
 * @param meeter_id
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export const notifyAll = (data) => async dispatch => {   
    const meeterList = await gpAxios.post(apiPaths.change_meeting_status, data);

    return meeterList; 
};