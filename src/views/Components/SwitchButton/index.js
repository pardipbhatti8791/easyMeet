import React from 'react';


export default function SwitchButton({ checked, ...props }) {
    return (
        <label className='switch'>
            <input type='checkbox' defaultChecked={checked} {...props} />
            <span className='slider round'></span>
        </label>
    );
}
