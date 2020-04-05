import {combineReducers} from 'redux';
import AuthorizationReducer from './Authorization/reducer';
import MainPageReducer from  './MainPage/reducer'

export default combineReducers({
    authorization: AuthorizationReducer,
    mainPage: MainPageReducer
})