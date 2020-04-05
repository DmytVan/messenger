import React from 'react';
import CrateChatForm from '../../CreateChatForm'

const NavList = ({logout, handleShow, ...rest}) => {
    return (
        <nav className='settingsNav'>
            <ul>
                <li>
                    <CrateChatForm showParent={handleShow} {...rest}/>
                </li>
                <li>
                    <a href="/#" onClick={e => {
                        e.preventDefault();
                        logout();
                    }}>logout
                    </a>
                </li>
                <li>
                    <a href="/#" onClick={e => {
                        e.preventDefault();
                        handleShow(false)
                    }}>close
                    </a>
                </li>
            </ul>
        </nav>
    )
};

export default NavList