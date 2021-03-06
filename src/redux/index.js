import { combineReducers } from 'redux';

import auth from './auth/reducer';
import meeting from './meetings/reducer';
import { user } from './user';
import modals from './global_modal/reducer';

export default combineReducers({
    auth,
    user,
    meeting,
    modals
});
