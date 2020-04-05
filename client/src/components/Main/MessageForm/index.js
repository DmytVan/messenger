import React, {useRef, useEffect, useState} from 'react';
import './index.css';
import {sendMessageEmit} from'../../../socket'

const MessageForm = ({id, token, selectedDialog, addMessage, username}) => {

    const uncontrolledDiv = useRef();
    const[emptyDiv, handleEmpty] = useState(false);
    const [divHeight, handleDivHeight] = useState('93px');
    let style = {
        minHeight: divHeight
    };

    useEffect(() => {
        uncontrolledDiv.current.focus();
    }, []);

    const handlePress = (e) => {
        if (e.key === 'Enter' && e.shiftKey) {
            return;
        }
        if (e.key === 'Enter') {
            e.preventDefault();
            formatMessage(uncontrolledDiv.current.childNodes);
            sendMessage(uncontrolledDiv.current.textContent);
        }
    };

    const handleBlur = (e) => {
        if (!uncontrolledDiv.current.textContent.trim()) {
            handleEmpty(true);
            uncontrolledDiv.current.textContent = '';
        }
    };

    const sendMessage = () => {
        if (!uncontrolledDiv.current.textContent.trim()) {
            return;
        }
        const message = {
            message:formatMessage(uncontrolledDiv.current.childNodes).trim(),
            recipientId: selectedDialog.id,
            date: new Date(),
            sender: id,
            senderName: username
        };
        fetch('/api/dialogues/newMessage', {
            method: 'post',
            body: JSON.stringify(message),
            headers: {
                authorization: `Token ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    alert(res.error)
                } else if (res.id) {
                    uncontrolledDiv.current.textContent = '';
                    message._id = res.id;
                    addMessage(selectedDialog.id, message);
                    sendMessageEmit(message);
                }
            });

    };

    const classList = emptyDiv ? 'im-input empty-blur': 'im-input';

    return (
        <div className='im-form-container' style={style}>
            <form className='im-send-form'>
                <div ref={uncontrolledDiv} className={classList} contentEditable='true'
                     onKeyPress={(e) => {
                         handlePress(e);
                     }}
                     onBlur={(e) => {
                         handleBlur(e)
                     }}
                     onFocus={(e) => {
                         handleEmpty(false);
                     }}
                     onInput={() => {
                         handleDivHeight((parseInt(getComputedStyle(uncontrolledDiv.current).height) + 38) + 'px')}
                     }/>
                <a className='send-ms-btn' onClick={sendMessage}>send</a>
            </form>
        </div>
    )
};

const formatMessage = (collection) => {
    let message = '';
    Array.from(collection).forEach(node => {
        if (node.nodeType === 3) {
            message += node.data;
        } else if (node.tagName === 'BR') {
            message += '\n'
        }
    });
    return message;
};

export default MessageForm