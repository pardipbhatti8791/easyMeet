import React from 'react';
import '~/scss/components/_button.scss';

/**
 *
 * @param checked
 * @param props
 * @returns {*}
 * @constructor
 */
export default function Button({ label, type = 'primary', htmlType = 'button', children, customClass = '', ...props }) {
    return (
        <button
            type={htmlType}
            className={type === 'primary' ? `btn btn-primary ${customClass}` : `btn btn-secondary ${customClass}`}
            {...props}>
            {children !== undefined ? children : label}
        </button>
    );
}
