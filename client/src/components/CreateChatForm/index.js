import React, {useState} from 'react';
import './index.css'

const CrateChatForm = ({createNewChat, token, showParent}) => {
    const [showInputs, handleShow] = useState(false);
    const [username, handleChange] = useState('');

    const onSubmit = (e) => {
        fetch(`api/dialogues/new?username=${username}`, {
            headers: {
                authorization: `Token ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.error) {
                    return alert(res.error)
                }
                const newDialog = {
                    username,
                    id: res.id
                };
                createNewChat(newDialog);
                showParent && showParent(false)
            })
    };

    return (
        <form className='createChatForm' onSubmit={e => {
            e.preventDefault();
            onSubmit(e);
        }}>
            <a href='/#' onClick={(e) => {
                e.preventDefault();
                handleShow(!showInputs)
            }}>create chat</a><br/>
            {showInputs ?
                <>
                    <input type="text" value={username} onChange={(e) => {
                        handleChange(e.target.value)
                    }
                    }/>
                    <input type="submit" value='✔'/>
                </>
                : null
            }
        </form>
    )
};

export default CrateChatForm