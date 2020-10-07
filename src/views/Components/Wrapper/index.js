import React from 'react';

export default function Wrapper({ children, title }) {
    return (
        <div className='wrapper'>
            <div className='wrapper_title'>
                <span>{title}</span>
            </div>
            <div className='wrapper_children'>{children}</div>
        </div>
    );
}
