import React from 'react';
import videoicon from '../../../../../assets/images/video icon.png';

const PublicPage = () => {
    return (
        <div className='img-wrapper-outer d-flex align-items-center'>
            <div className='img-wrapper-inner text-center'>
                <div className='vedio-play-wrapper d-flex align-items-center justify-content-center'>
                    <div className='vedio-background-wrapper d-flex align-items-center justify-content-center'>
                        <figure className='mb-0'>
                            <img src={videoicon} />
                        </figure>
                    </div>
                </div>
                <h2 className='img-heading mt-3'>start call</h2>
            </div>
        </div>
    );
};
export default PublicPage;
// <div
