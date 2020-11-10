import React from 'react';

const Log = ({ type, text }) => {
    let logType = 'log-info';
    switch (type) {
        case 'error':
            logType = 'log-error';
            break;
        case 'ok':
            logType = 'log-ok';
            break;
        default:
            break;
    }

    return (
        <div className='row'>
            <span className={logType}>{text}</span>
        </div>
    );
};

export default Log;
