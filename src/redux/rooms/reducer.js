import { HOST_AVAILABLE, SET_MEETING_ROOM, SET_PARTICIPANTS } from './type';

const intialState = {
    hostAvailable: true,
    room: localStorage.getItem('room') !== null ? localStorage.getItem('room') : null,
    participants: null
};

export default (state = intialState, actions) => {
    switch (actions.type) {
        case HOST_AVAILABLE:
            return {
                ...state,
                hostAvailable: actions.payload
            };
        case SET_MEETING_ROOM:
            localStorage.setItem('room', actions.payload);
            return {
                ...state,
                room: actions.payload
            };
        case SET_PARTICIPANTS:
            return {
                ...state,
                participants: actions.payload
            };
        default:
            return state;
    }
};
