export const LOGOUT = 'LOGOUT';
export const CREATE_NEW_CHAT = 'CREATE_NEW_CHAT';
export const CHOOSE_DIALOG = 'CHOOSE_DIALOG';
export const SET_DIALOGUES = 'GET_DIALOGUES';
export const SET_MESSAGES = 'SET_MESSAGES';
export const VIEWED_MESSAGES = 'VIEWED_MESSAGES';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const GET_MESSAGE = 'GET_MESSAGE';

export const logout = () => {
    return {
        type: LOGOUT
    }
};

export const createNewChat = (user) => {
    return {
        type: CREATE_NEW_CHAT,
        user
    }
};

export const chooseDialog = (dialog) => {
    return {
        type: CHOOSE_DIALOG,
        dialog
    }
};

export const setDialogues = (dialogues) => {
    return {
        type: SET_DIALOGUES,
        dialogues
    }
};

export const setMessages = (messages) => {
    return {
        type: SET_MESSAGES,
        messages
    }
};

export const viewedMessages = (dialogId) => {
    return {
        type: VIEWED_MESSAGES,
        dialogId
    }
};

export const addMessage = (selectedDialogID, message) => {
    return {
        type: ADD_MESSAGE,
        message,
        selectedDialogID
    }
};

export const getMessage = (message) => {
    return {
        type: GET_MESSAGE,
        message
    }
};

