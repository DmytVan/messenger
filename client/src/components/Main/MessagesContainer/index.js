import React, {useRef, useEffect, Fragment} from 'react';
import './index.css'
import MessageForm from '../MessageForm';
import MessageItem from '../MessageItem'

const MessagesContainer = (props) => {
    const {selectedDialog, token, setMessages, messages, viewedMessages, username, id} = props;

    const imHistory = useRef();

    useEffect(() => {
        console.log(selectedDialog, 11111111111111111111111111, id)
        fetch(`/api/dialogues/dialog?recipientId=${selectedDialog.id}`, {
            method: 'get',
            headers: {
                authorization: `Token ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    return alert(res.error)
                }
                setMessages(res);
                return fetch(`/api/dialogues/viewedMessages?recipientId=${selectedDialog.id}`, {
                    method: 'get',
                    headers: {
                        authorization: `Token ${token}`
                    }
                })
            })
            .then(res => res.json())
            .then(res => {
                if (res.ok) {
                    viewedMessages(selectedDialog.id);
                } else if (res.error) {
                    alert(res.error)
                }
            })


    }, [token, selectedDialog]);

    useEffect(() => {
        if (selectedDialog.lastMessage && selectedDialog.lastMessage.sender !== id) {
            fetch(`/api/dialogues/viewedMessages?recipientId=${selectedDialog.id}`, {
                method: 'get',
                headers: {
                    authorization: `Token ${token}`
                }
            });
        }
        imHistory.current.scrollTop += 99999;
    }, [messages])

    let lastSenderId = null;

    const messagesList = messages.map(message => {
        if (lastSenderId === message.sender) {
            return <MessageItem message={message} key={message._id}/>
        }
        const senderName = message.sender === id ? username : selectedDialog.username;
        lastSenderId = message.sender;
        return (
            <Fragment key={message._id}>
                <li>
                    <div className='sender-name'>{senderName}
                    </div>
                </li>
                <MessageItem message={message}/>
            </Fragment>
        )
    });


    return (
        <>
            <div ref={imHistory} className='im-history'>
                <ul>
                    {messagesList}
                </ul>
            </div>
            <MessageForm imHistoryRef={imHistory} {...props}/>
        </>
    )
};

export default MessagesContainer;