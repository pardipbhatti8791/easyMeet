import * as types from './types';
import service from '../../../service/service';

const fetchListUser = (params = {}) => {
    return dispatch => {
        dispatch({ type: types.FETCH_LIST_USER });
        service
            .get('/users', { params })
            .then(res => {
                dispatch({ type: types.FETCH_LIST_USER_SUCCESS, payload: res.data });
            })
            .catch(error => dispatch({ type: types.FETCH_LIST_USER_FAIL, payload: error }));
    };
};

export { fetchListUser };
