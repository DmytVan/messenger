import React, {useEffect} from 'react';
import Navigation from './Navigation';
import DialogList from './DialoguesList';
import './index.css';
import MessagesContainer from './MessagesContainer';
import {connectUserEmit, acceptMessageSubscribe} from '../../socket'



const Main = (props) => {
    const {username, logout, _id: id, token, createNewChat, dialogues, selectedDialog, chooseDialog, setMessages, messages, viewedMessages, addMessage, getMessage} = props;

    useEffect(() => {
        if (id) {
            connectUserEmit(id);
            acceptMessageSubscribe((message) => {getMessage(message)});
        }
    }, [id]);

    useEffect(() => {
        // acceptMessageSubscribe((message) => {getMessage(message)})
    }, []);

    return (
        <div className='msg-container'>
            <div className="msg-header">
                <Navigation logout={logout} username={username} token={token} createNewChat={createNewChat}/>
            </div>
            <div className='msg-content'>
                <div className='dialogues-column'>
                    <DialogList token={token} id={id} dialogues={dialogues} chooseDialog={chooseDialog} selectedDialog={selectedDialog}/>
                </div>
                <div className='messages-column'>
                    {
                        selectedDialog
                            ? <MessagesContainer username={username} id={id} token={token} selectedDialog={selectedDialog} setMessages={setMessages} messages={messages} viewedMessages={viewedMessages} addMessage={addMessage}/>
                            : <div className='im-none-select'>
                                <p>Please select a chat to start messaging</p>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
};


export default Main;