import * as types from './types';

const initialState = {
    users: [],
    details: { count: 0, filter: '', limit: 0, page: 0, pages: 0 },
    sending: false
};

export const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case types.FETCH_LIST_USER:
            return {
                ...state,
                sending: true
            };
        case types.FETCH_LIST_USER_SUCCESS:
            return {
                ...state,
                users: actions.payload.items,
                details: actions.payload.details,
                sending: false
            };
        case types.FETCH_LIST_USER_FAIL:
            return {
                ...state,
                sending: false
            };
        default:
            return state;
    }
};

export default reducer;
