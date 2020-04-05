import React, {useState} from 'react';
import './index.css'
import Modal from '../../ModalWindow'
import NavList from './NavList';

const Navigation = (props) => {
    const {username} = props;
    const [showModal, handleShow] = useState(false);
    return (
        <div style={{width:'100%', height:'100%'}}>
            <a className='settings-btn' href="/#" onClick={e => {
                e.preventDefault();
                handleShow(true)
            }}>Settings
            </a>
            {showModal ?
                <Modal>
                    <div className='modal' onClick={function (e) {
                        if (e.target === e.currentTarget) {
                            handleShow(false)
                        }
                    }}>
                        <div className='settingsContainer'>
                            <div className='settingsHead'>
                                <a href="/#" onClick={e => {
                                    e.preventDefault();
                                    handleShow(false)
                                }}>close
                                </a>
                                <h2>{username}</h2>
                                </div>
                            <NavList handleShow={handleShow} {...props}/>
                        </div>
                    </div>
                </Modal> :
                null}

        </div>
    )
};

export default Navigation