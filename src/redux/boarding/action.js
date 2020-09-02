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
 * @param file
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export const updateProfilePicture = file => dispatch => {
    return gpAxios.post(apiPaths.user_management.update_profile_pic, file);
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
    return gpAxios.get(apiPaths.user_management.check_meeter_availibility + meeter_id);
};


/**
 *
 * @param meeter_id
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export const getMeeterData = meeter_slug => async dispatch => { 
    alert(1);
    console.log("trest",apiPaths.user_management.get_meeter_from_slug + meeter_slug);
    const meeterData = await gpAxios.get(apiPaths.user_management.get_meeter_from_slug + meeter_slug);
    dispatch(loadUser());
    //return meeterData; 
};