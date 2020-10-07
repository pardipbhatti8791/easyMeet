import React from 'react';
import { useSelector } from 'react-redux';

import '../../../scss/components/_spinner.scss';
const Spinner = ({ ...props }) => {
    const { autoHide } = useSelector(store => store.theme.sidebar);

    return (
        <div className={`spin ${autoHide ? '' : 'small_loading_area'}`} {...props}>
            <div className='spin__area'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Spinner;
