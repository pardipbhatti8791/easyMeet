import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


/**
 *
 * @param path
 * @returns {JSX.Element}
 */
export const returnToRoute = path => {
    return <Redirect to={path} />;
};

/**
 *
 * @param Component
 * @param rest
 * @returns {JSX.Element}
 * @constructor
 */
const PublicRoute = ({ component: Component, ...rest }) => {
    const auth = useSelector(state => state.auth);
    const { isAuthenticated } = auth;

    if (isAuthenticated) {
        return <Route {...rest} render={props => returnToRoute('/')} />;
    } else {
        return <Route {...rest} render={props => <Component {...props} />} />;
    }
};



export default PublicRoute;
