export const CLEAR_INPUTS = 'CLEAR_INPUTS';
export const CHANGE_USERNAME = 'CHANGE_USERNAME';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_REGISTRATION_FLAG = 'CHANGE_REGISTRATION_FLAG';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const SAVE_USER_INFO = 'SAVE_USER_INFO';


export const clearInputs = () => {
    return {
        type: CLEAR_INPUTS
    }
};

export const changeUsername = (newUsername) => {
    return {
        type: CHANGE_USERNAME,
        newUsername
    }
};

export const changePassword = (newPassword) => {
    return {
        type: CHANGE_PASSWORD,
        newPassword
    }
};

export const changeRegistrationFlag = () => {
    return {
        type: CHANGE_REGISTRATION_FLAG
    }
};

export const setErrorMessage = (message) => {
    return {
        type: SET_ERROR_MESSAGE,
        message
    }
};

export const saveUserInfo = (user) => {
    return {
        type: SAVE_USER_INFO,
        user
    }
};

