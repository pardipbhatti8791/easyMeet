import React from 'react';
import '../../../scss/components/_status.scss';

export default function Status({ label }) {
    return <div className={`Status Status--${label}`}>{label}</div>;
}
