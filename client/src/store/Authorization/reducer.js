import {CHANGE_PASSWORD, CHANGE_USERNAME, CLEAR_INPUTS, CHANGE_REGISTRATION_FLAG, SET_ERROR_MESSAGE} from "./actions";

const initialState = {
    username: '',
    password: '',
    isRegistration: false
};


export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_USERNAME:
            return {...state, username: action.newUsername};
        case CHANGE_PASSWORD:
            return {...state, password: action.newPassword};
        case CLEAR_INPUTS:
            return {...state, username: '', password: ''};
        case CHANGE_REGISTRATION_FLAG:
            return {...state, isRegistration: !state.isRegistration};
        case SET_ERROR_MESSAGE:
            return {...state, error: action.message};
        default:
            return state;
    }
};