import { AUTHENTICATION } from './constant';


/**
 *
 * @param {*} isSpin
 */
export const setMeeterSlug = slug => {
    return {
        type: AUTHENTICATION.SET_MEETER_SLUG,
        payload: slug
    };
};