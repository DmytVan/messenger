import React from 'react';
import './index.css'
import DialogItem from '../DialogItem'

const DialoguesList = (props) => {
    const {dialogues} = props;
    const dialoguesList = dialogues.sort((a,b) => {return +new Date(b.lastChange)- +new Date(a.lastChange)}).map(dialog => <DialogItem dialog={dialog} key={dialog.id} {...props}/>)
    return (
        <ul className='dialog-list'>
            {dialoguesList}
        </ul>
    )
};

export default DialoguesList;