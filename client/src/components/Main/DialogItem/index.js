import React from 'react';

export const DialogItem = ({id, dialog, chooseDialog, selectedDialog, token}) => {
    const handleDialog = (e) => {
        if (selectedDialog && selectedDialog.id === dialog.id) {
            return
        }
        chooseDialog(dialog);
    };
    const countOfNewMessages = dialog.countOfNewMessages ?
        <span className='new-ms'>{dialog.countOfNewMessages}</span> : null;
    const lastMessage = dialog.lastMessage ? <span className='last-dialog'>{dialog.lastMessage.message}</span> : null;
    return (
        <li onClick={(e) => {
            handleDialog(e)
        }}>
            <a className={selectedDialog && selectedDialog.id === dialog.id ? 'selectedDialog' : ""}>
                <h3 className='interlocutor-name'>{dialog.username}</h3>
                <div className='dialog-ms-info'>
                    <div className='last-dialog-wrapper'>
                    {lastMessage}
                    </div>
                    {countOfNewMessages}
                </div>

            </a>
        </li>
    )
};

export default DialogItem;