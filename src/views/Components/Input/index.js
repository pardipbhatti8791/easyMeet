import React from 'react';
import '~/scss/components/_text-field.scss';

/**
 *
 * @param checked
 * @param props
 * @returns {*}
 * @constructor
 */
export default function TextField({
    label = null,
    type = 'text',
    placeholder = 'example',
    customClass = '',
    ...props
}) {
    return <input type={type} className={`form-control ${customClass}`} placeholder={placeholder} {...props} />;
}
