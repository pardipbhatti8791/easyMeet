import swal from '@sweetalert/with-react';
import Alert from 'react-bootstrap/Alert';
import React from 'react';

export const errorAlert = (data, type = 'danger') => {
    swal(
        <div>
            {Object.keys(data).map((val, i) => {
                return (
                    <Alert key={i} variant={type}>
                        {data[val]}
                    </Alert>
                );
            })}
        </div>
    );
};
