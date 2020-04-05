import React from 'react';
import {connect} from 'react-redux'
import {
    clearInputs,
    changeUsername,
    changePassword,
    changeRegistrationFlag,
    setErrorMessage,
    saveUserInfo
} from "../../store/Authorization/actions";
import './index.css';
import {useHistory} from 'react-router-dom'

const Authorization = ({
                           username,
                           password,
                           isRegistration,
                           changeUsername,
                           changePassword,
                           clearInputs,
                           changeRegistrationFlag,
                           saveUserInfo,
                           error,
                           setErrorMessage
                       }) => {

    const history = useHistory();

    const fetchUserData = () => {
        const user = {
            username: username,
            password: password
        };

        const url = isRegistration ? 'api/users' : 'api/users/login';
        fetch(url, {
            method: 'post',
            body: JSON.stringify({user}),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.error) {
                    setErrorMessage(res.error)
                } else if (res.user) {
                    setErrorMessage(null);
                    saveUserInfo(res.user);
                    clearInputs();
                    history.push("/im")
                } else {
                    console.log(res);
                    setErrorMessage('Unexpected Error!')
                }
            });
    };

    return (
        <>
            <h1>{isRegistration ? 'Registration' : 'Login'}</h1>
            <form className='authorizationForm' onSubmit={((e) => {
                e.preventDefault();
                fetchUserData();
            })}>
                <fieldset>
                    <legend>{isRegistration ? 'Registration' : 'Login'}</legend>
                    <label>
                        Username:
                        <input type='text' name='username' value={username}
                               onChange={(e) => {
                                   changeUsername(e.target.value)
                               }}/>
                    </label>
                    <label>
                        Password:
                        <input type="password" name='password' value={password}
                               onChange={(e) => {
                                   changePassword(e.target.value)
                               }}/>
                    </label>
                    <input type="submit" value='ok'/>
                    <input type="button" value={isRegistration ? 'LogIn' : 'Registration'}
                           onClick={() => {
                               changeRegistrationFlag()
                           }}/>
                    <p className="error">{error}</p>
                </fieldset>
            </form>
        </>
    )
};


const mapStateToProps = (state) => {
    return {...state.authorization};
};

const mapActionsToProps = {
    changeUsername,
    changePassword,
    clearInputs,
    changeRegistrationFlag,
    saveUserInfo,
    setErrorMessage
};

export default connect(mapStateToProps, mapActionsToProps)(Authorization);