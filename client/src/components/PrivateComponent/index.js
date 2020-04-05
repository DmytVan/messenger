import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {
    logout,
    createNewChat,
    chooseDialog,
    setDialogues,
    setMessages,
    viewedMessages,
    addMessage,
    getMessage
} from "../../store/MainPage/actions";
import {saveUserInfo} from "../../store/Authorization/actions";
import {Redirect} from 'react-router-dom'
import Main from '../Main'

const PrivateComponent = (props) => {
    const {logout, saveUserInfo, setDialogues} = props;
    const token = props.token || localStorage.getItem('token');
    useEffect(() => {
        if (!token) {
            return
        }
        fetch('api/users/current', {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {

                if (res.error) {
                    console.log(res.error)
                    logout();
                } else if (res.user) {
                    saveUserInfo(res.user)
                    fetch('api/dialogues/all', {
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    })
                        .then(res => res.json())
                        .then(res => {
                            setDialogues(res)
                        })
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    if (!token) {
        return <Redirect to='/login'/>
    }

    return <Main {...props}/>
};

const mapStateToProps = (state) => {
    return {...state.mainPage}
};

const mapActionsToProps = {
    logout,
    saveUserInfo,
    createNewChat,
    chooseDialog,
    setDialogues,
    setMessages,
    viewedMessages,
    addMessage,
    getMessage
};

export default connect(mapStateToProps, mapActionsToProps)(PrivateComponent);


