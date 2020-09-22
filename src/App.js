import React, { useEffect } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import createStore from './store/store';
import ProtectedRoute from './routing/ProtectedRoute';
import PublicRoute from './routing/PublicRoute';
import { loadUser } from './redux/auth/actions';
import ModalManager from './redux/global_modal/manager';

// Containers
const Login = React.lazy(() => import('./views/Pages/PublicPages/Login/Login'));
const SignUp = React.lazy(() => import('./views/Pages/PublicPages/Register/SignUp'));
const MeetingLink = React.lazy(() => import('./views/Pages/PublicPages/MeetingLink/MeetingLink'));
const DefaultLayout = React.lazy(() => import('./containers/PrivateLayouts/TheLayout'));

const loading = () => (
    <div className='animated fadeIn pt-3 text-center'>
        <div className='sk-spinner sk-spinner-pulse'></div>
    </div>
);

const store = createStore;

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <Provider store={store}>
            <BrowserRouter>
                <ModalManager />
                <React.Suspense fallback={loading()}>
                    <Switch>
                        <Route path='/meet/:slug' exact component={MeetingLink} />
                        <PublicRoute exact path='/login' component={Login} />
                        <PublicRoute exact path='/sign-up' component={SignUp} />
                        <ProtectedRoute path='/' component={DefaultLayout} />
                    </Switch>
                </React.Suspense>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
