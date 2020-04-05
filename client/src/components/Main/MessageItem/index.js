import React from 'react';
import './index.css';

const MessageItem = ({message}) => {
    return (
        <li>
            <div className='ms-message'>{message.message}</div>
            <div className='ms-date'>{formatDate(message.date)}</div>
        </li>
    )
};

function formatDate(messageDate) {
    const date = new Date(messageDate);

    let d = date;
    d = [
        '0' + d.getDate(),
        '0' + (d.getMonth() + 1),
        '' + d.getFullYear(),
        '0' + d.getHours(),
        '0' + d.getMinutes(),
        '0' + d.getSeconds()
    ].map(component => component.slice(-2));

    return d.slice(0, 3).join('.') + '\n' + d.slice(3).join(':');
}

const getDate = (messageDate) => {
    const date = new Date(messageDate);
    const today = new Date();

    console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)

    if(date.getDate() === today.getDate() && (today - date)/1000 < 86400) {

        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }
    console.log(date);

    return `${date.getDate()}:${date.getMonth()+1}:${date.getFullYear()-2000}`
};

export default MessageItem;