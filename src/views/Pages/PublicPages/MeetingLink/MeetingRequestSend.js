import React from 'react';
import defaultImage from '../../../../assets/images/EasyMeetBig.svg';

const MeetingRequestSend = () => {
    const defaultImg = e => {
        e.target.src = defaultImage;
    };
    return (
        <>
            <div className='meeterProfile meeterProfile6'>
                <div className='container'>
                    <div className='row'>
                        <div className='w-100 text-center'>
                            <div className='MeeterBrandContainer pt-3 pb-4'>
                                <a className='navbar-brand m-0 px-0 pt-5 pb-2 d-block' href='index.html'>
                                    <img src='images/EasyMeetBig.svg' onError={defaultImg} alt='logo' />
                                </a>
                                <span className='Brandtext opacity-8'>Never schedule a meeting again.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='MeeterLine w-100 m-0'></div>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-6 col-sm-12 text-center pt-4 px-1'>
                            <div className='Goodjob text-center pt-3'>
                                <div className='avatar m-auto'>
                                    <i className='fa fa-thumbs-o-up medium-size' aria-hidden='true'></i>
                                </div>
                                <h2 className='requesterName pt-4'>Good Job!</h2>
                                <span className='d-block mb-5 medium-size'>
                                    We already sent both browser and email notifications to the host.
                                    <br />
                                    Wait for the notification on your side when host will be available
                                </span>
                                <i>Meanwhile...</i>
                            </div>
                            <div className='meeterProfileMsg px-2 py-3'>
                                <h2 className='opacity-8'>Use EasyMeet to host meetings yourself!</h2>
                                <span className='opacity-6 d-block'>
                                    dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                </span>
                                <button
                                    type='button'
                                    className='btn btn-primary medium-size'
                                    onClick={() => {
                                        window.location.href = '/sign-up';
                                    }}>
                                    Sign up as a host
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default MeetingRequestSend;
