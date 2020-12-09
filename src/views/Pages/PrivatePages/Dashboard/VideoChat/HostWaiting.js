import React from 'react';

const HostWaiting = () => {
    return (
        <div className='bggray withSideBar meetRoom waitingHost'>
            <div className='host text-right'>
                {/* <button class='btn px-4 m-4 small-size'>Host Web Camera</button> */}
            </div>
            <div className='container mainRoom'>
                <div className='row justify-content-center align-items-center h-100'>
                    <div>
                        <div className='media mainRoomMedia personal-details media-body text-center d-block mb-4'>
                            <div className='text-center default-opacity m-auto avatar-container'></div>
                            <h2 className='font36 mt-4 mb-2 mb-0'>Waiting for the host.</h2>
                            <p className='edit-bio medium-size gray8' href='#'>
                                Host is available and must join the room soon
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HostWaiting;
