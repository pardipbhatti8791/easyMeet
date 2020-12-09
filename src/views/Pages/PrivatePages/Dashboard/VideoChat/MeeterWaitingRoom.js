import React from 'react';

const MeeterWaitingRoom = () => {
    return (
        <>
            <div className='meeterProfile'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-6 col-sm-12'>
                            <div className='personal-details py-5 boxShadowNon'>
                                <div className='media personal-details boxShadowNon media-body text-center d-block mb-4'>
                                    <div className='text-center default-opacity m-auto avatar-container'>
                                        <img src='images/photo.png' alt='photo' />
                                    </div>
                                    <h2 className='requesterName mt-3 mb-1 mb-0'>John Doe</h2>
                                    <a className='edit-bio gray8 small-size' href='#'>
                                        Founder of Herjavec Group | Shark on ABC's Shark Tank | Bestselling Author
                                    </a>
                                    <span className='small-size d-block blue mt-1'>Available for 7h 49m</span>
                                </div>
                                <div className='mb-4'>
                                    <h1 className='font36'>You’re 4th on wait list.</h1>
                                </div>
                                <div>
                                    <p className='gray6 mb-0'>
                                        Someone joined the room faster than you. Please wait in
                                        <br />
                                        order to get on the meeting.
                                    </p>
                                    <br />
                                    <p className='small-size opacity-6'>
                                        Note that meeting is not guaranteed, as the host might become unavailable at any
                                        time.
                                    </p>
                                </div>
                                <div className='meeterProfileMsg px-2 py-3'>
                                    <h2 className='gray8'>Use EasyMeet to host meetings yourself!</h2>
                                    <p className='gray6'>Not having to schedule meetings is a superpower</p>
                                    <button
                                        type='button'
                                        className='btn btn-primary medium-size'
                                        onClick={() => {
                                            window.location.href = 'sign-up';
                                        }}>
                                        Sign up as a host
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default MeeterWaitingRoom;
