import { createReducer } from '../../utils/reducerUtil';
import { AUTHENTICATION } from './constant';

const initState = {
    spinner: false,
    meeter_meet_slug: ''
};

/**
 * @setSpinner
 * @param state
 * @param payload
 * @returns {{spinner: boolean}}
 */
export const setSpinner = (state, payload) => ({
    ...state,
    spinner: payload
});

/**
 * @setSpinner
 * @param state
 * @param payload
 * @returns {{spinner: boolean}}
 */
export const setMeeterSlug = (state, payload) => ({
    ...state,
    meeter_meet_slug: payload
});

export default createReducer(initState, {
    [AUTHENTICATION.SPINNER]: setSpinner,
    [AUTHENTICATION.SET_MEETER_SLUG]: setMeeterSlug
});
