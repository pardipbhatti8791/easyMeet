import React, { useEffect } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';

import createStore from './store/store';
import ProtectedRoute from './routing/ProtectedRoute';
import PublicRoute from './routing/PublicRoute';
import { loadUser } from './redux/auth/actions';
import ModalManager from './redux/global_modal/manager';

// Containers
const Login = React.lazy(() => import('./views/Pages/PublicPages/Login/Login'));
const SignUp = React.lazy(() => import('./views/Pages/PublicPages/Register/SignUp'));
const MeetingLink = React.lazy(() => import('./views/Pages/PublicPages/MeetingLink/MeetingLink'));
const VideoChat = React.lazy(() => import('./views/Pages/PrivatePages/Dashboard/VideoChat/VideoChat'));
const DefaultLayout = React.lazy(() => import('./containers/PrivateLayouts/TheLayout'));
const ForgetPassword = React.lazy(() => import('./views/Pages/PublicPages/ForgetPassword/ForgetPassword'));
const ResetPassword = React.lazy(() => import('./views/Pages/PublicPages/ResetPassword/ResetPassword'));
const MeetingRequestSend = React.lazy(() => import('./views/Pages/PublicPages/MeetingLink/MeetingRequestSend'));
const loading = () => (
    <div className='animated fadeIn pt-3 text-center'>
        <div className='sk-spinner sk-spinner-pulse'></div>
    </div>
);

const store = createStore;

const App = () => {
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.dispatch(loadUser());
        }
    }, []);
    return (
        <Provider store={store}>
            <BrowserRouter>
                <ModalManager />
                <React.Suspense fallback={loading()}>
                    <Switch>
                        <Route path='/video-chat/:signature?' component={VideoChat} />
                        <Route path='/meet/:slug' component={MeetingLink} />
                        <Route path='/request-send-sucess' component={MeetingRequestSend} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/sign-up' component={SignUp} />
                        <Route exact path='/forget-password' component={ForgetPassword} />
                        <PublicRoute exact path='/reset-password/:token?' component={ResetPassword} />
                        <ProtectedRoute path='/' component={DefaultLayout} />
                    </Switch>
                </React.Suspense>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
