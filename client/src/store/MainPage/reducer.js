import {SAVE_USER_INFO} from "../Authorization/actions";
import {
    LOGOUT,
    CREATE_NEW_CHAT,
    CHOOSE_DIALOG,
    SET_DIALOGUES,
    SET_MESSAGES,
    VIEWED_MESSAGES,
    ADD_MESSAGE,
    GET_MESSAGE
} from "./actions";

const initialState = {
    token: localStorage.getItem('token'),
    dialogues: [],
    selectedDialog: null,
    messages: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_USER_INFO:
            localStorage.setItem('token', action.user.token)
            return {...state, ...action.user};
        case LOGOUT:
            localStorage.removeItem('token');
            return {dialogues: []};
        case CREATE_NEW_CHAT:
            console.log(action.user);
            return {
                ...state, dialogues: hasDialog(state.dialogues, action.user) ?
                    state.dialogues :
                    [...state.dialogues, {...action.user, lastChange: +new Date()}],
                selectedDialog: action.user, messages: []
            };
        case CHOOSE_DIALOG:
            return {...state, selectedDialog: action.dialog, messages: []};
        case SET_DIALOGUES:
            return {...state, dialogues: action.dialogues};
        case SET_MESSAGES:
            return {...state, messages: action.messages};
        case VIEWED_MESSAGES:
            return {...state, dialogues: zeroingNumberIncomingMessages(state.dialogues, action.dialogId)};
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.message],
                dialogues: setLastDialogChange(state.dialogues, action.selectedDialogID, action.message)
            };
        case GET_MESSAGE:
            return getStateOnGetMessage(state, action.message);
        default:
            return state
    }
};

const hasDialog = (dialogs, user) => {
    let hasDialog = false;
    dialogs.forEach(dialog => {
        if (dialog.id === user.id) {
            hasDialog = true
        }
    });
    return hasDialog;
}

const zeroingNumberIncomingMessages = (dialogues, dialogId) => {
    const newDialogues = [...dialogues];
    return newDialogues.map(dialog => {
        if (dialog.id === dialogId) {
            return {...dialog, countOfNewMessages: 0}
        }
        return dialog;
    });
};

const setLastDialogChange = (dialogues, dialogID, message) => {
    const newDialogues = [...dialogues];
    return newDialogues.map(dialog => {
        if (dialog.id === dialogID) {
            return {...dialog, lastChange: message.date, lastMessage: message}
        }
        return dialog;
    });
};

const getStateOnGetMessage = (state, message) => {
    let hasDialog = false;
    const newState = {...state};
    const newDialogues = [...newState.dialogues];
    if (newState.selectedDialog && newState.selectedDialog.id === message.sender) {
        newState.messages = [...newState.messages, message];
        newState.dialogues = newDialogues.map(dialog => {
            if (dialog.id === message.sender) {
                hasDialog = true;
                return {...dialog, lastChange: message.date, lastMessage: message};
            }
            return dialog;
        });
    } else {
        newState.dialogues = newDialogues.map(dialog => {
            if (dialog.id === message.sender) {
                hasDialog = true;
                return {
                    ...dialog,
                    lastChange: message.date,
                    lastMessage: message,
                    countOfNewMessages: dialog.countOfNewMessages + 1
                }
            }
            return dialog;
        });
        if (!hasDialog) {
            newDialogues.push({
                id: message.sender,
                lastChange: +new Date(message.date),
                username: message.senderName,
                lastMessage: message,
                countOfNewMessages: 1
            });
            newState.dialogues = newDialogues;
        }


        console.log(newState)
    }

    return newState
};

export default reducer;