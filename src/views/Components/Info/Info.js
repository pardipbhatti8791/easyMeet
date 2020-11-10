import React from 'react';

const Info = props => {
    return (
        <div className='container-fluid animated fadeIn' style={{ width: '100%' }}>
            <div
                className='row justify-content-center'
                style={{ alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                <div style={{ position: 'absolute', height: '40px' }}>
                    <span style={{ fontSize: '24px' }}>{props.text}</span>
                </div>
            </div>
        </div>
    );
};

export default Info;
