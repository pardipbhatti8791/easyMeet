import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CustomLoader } from './Loader';

/**
 *
 * @param Component
 * @param rest
 * @returns {JSX.Element}
 * @constructor
 */
const RenderComponent = ({ component: Component, ...rest }) => {
    const { spinner, data } = rest
    return (
        <Route {...rest} render={props => spinner ? <CustomLoader /> :  <Component {...props} data={data} />} />
    );
};

RenderComponent.propTypes = {
    spinner: {
        type: PropTypes.bool 
    },
    data: {
        type: PropTypes.object 
    }
}

export default RenderComponent;
