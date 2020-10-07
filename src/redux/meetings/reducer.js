import { createReducer } from '../../utils/reducerUtil';
import { meeting } from './types';

const initState = {
    meeter_spinner: true,
    meeter_data: null,
    meeter_error: null,
    meeting_spinner: true,
    meeting_list: null,
    meeting_error: null

};

/**
 * @setSpinner
 * @param state
 * @param payload
 * @returns {{spinner: boolean}}
 */
export const setSpinnerOn = (state, payload) => ({
    ...state,
    meeter_spinner: true
});

/**
 * @setSpinner
 * @param state
 * @param payload
 * @returns {{spinner: boolean}}
 */
export const setSpinnerOff = (state, payload) => ({
    ...state,
    meeter_spinner: false
});

/**
 *
 * @param state
 * @param payload
 * @returns {{meeter_data: *, meeter_spinner: boolean}}
 */
export const setMeeterData = (state, payload) => ({
    ...state,
    meeter_data: payload
});

/**
 *
 * @param state
 * @param payload
 * @returns {{meeter_error: *, meeter_spinner: boolean}}
 */
export const setMeeterFailed = (state, payload) => ({
    ...state,
    meeter_error: payload
});

/**
 * @setSpinner
 * @param state
 * @param payload
 * @returns {{spinner: boolean}}
 */
export const setMeetingSpinnerOn = (state, payload) => ({
    ...state,
    meeting_spinner: true
});

/**
 * @setSpinner
 * @param state
 * @param payload
 * @returns {{spinner: boolean}}
 */
export const setMeetingSpinnerOff = (state, payload) => ({
    ...state,
    meeting_spinner: false
});

/**
 *
 * @param state
 * @param payload
 * @returns {{meeting_list: *, meeting_spinner: boolean}}
 */
export const setMeetingData = (state, payload) => ({
    ...state,
    meeting_list: payload
});

/**
 *
 * @param state
 * @param payload
 * @returns {{meeting_error: *, meeting_spinner: boolean}}
 */
export const setMeetingFailed = (state, payload) => ({
    ...state,
    meeting_error: payload
});

export default createReducer(initState, {
    [meeting.GET_METER_DATA_SPINNER_ON]: setSpinnerOn,
    [meeting.GET_METER_DATA_SPINNER_OFF]: setSpinnerOff,
    [meeting.GET_METER_DATA_SUCCESS]: setMeeterData,
    [meeting.GET_METER_DATA_FAILED]: setMeeterFailed,
    
    [meeting.GET_MEETING_DATA_SPINNER_ON]: setMeetingSpinnerOn,
    [meeting.GET_MEETING_DATA_SPINNER_OFF]: setMeetingSpinnerOff,
    [meeting.GET_MEETING_DATA_SUCCESS]: setMeetingData,
    [meeting.GET_MEETING_DATA_FAILED]: setMeetingFailed,
});
