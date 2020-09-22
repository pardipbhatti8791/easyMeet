import React, { Fragment } from 'react';


import ThePrivateHeader from './PrivateHeader';
import TheContent from './TheContent';

const TheLayout = () => {
    return (
        <Fragment>
            <ThePrivateHeader/>
            <TheContent/>
        </Fragment>
    );
};

export default TheLayout;
