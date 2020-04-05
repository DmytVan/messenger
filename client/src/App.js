import React from 'react';
import {createStore} from 'redux';
import mainReducer from './store/reducers';
import {Provider} from 'react-redux';
import Authorization from './components/Authorization';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import PrivateComponent from './components/PrivateComponent'
import './index.css'


const store = createStore(mainReducer);


class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <Switch>
                        <Route exact path='/'>
                            <Redirect to='/login' />
                        </Route>
                        <Route path='/login' render={() => {
                            if (localStorage.getItem('token')) {
                                return <Redirect to='/im' />;
                            }
                            return <Authorization/>
                        }}/>
                        <Route path='/im'>
                            <PrivateComponent />
                        </Route>
                    </Switch>
                </Provider>
            </BrowserRouter>
        );
    }
}

export default App;
