import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import muteVideo from '../../../../../assets/images/mutevideo.png';

const Footer = props => {
    console.log('footer data is', props.data);
    const { room } = props.data;
    const userInfo = useSelector(state => state.auth.user);
    const isAuth = useSelector(state => state.auth.isAuthenticated);

    const [localAudio, setLocalAudio] = useState(true);
    const [localVideo, setLocalVideo] = useState(true);

    const localAudioMute = () => {
        room.localParticipant.audioTracks.forEach(publication => {
            if (localAudio == true) {
                publication.track.disable();
                setLocalAudio(false);
            } else {
                publication.track.enable();
                setLocalAudio(true);
            }
        });
    };
    const localVideoMute = () => {
        room.localParticipant.videoTracks.forEach(publication => {
            if (localVideo == true) {
                publication.track.disable();
                setLocalVideo(false);
            } else {
                publication.track.enable();
                setLocalVideo(true);
            }
        });
    };
    return (
        <footer className='bg-white py-3 px-2'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-xs-7 d-flex footerDetails'>
                        <div className='waiting d-lg-block d-none align-items-center text-left py-2 mr-4 pr-4 borderRight'>
                            <div className='media text-left'>
                                <div className='align-self-center default-opacity text-center noBorder mr-2 mt-1 avatar-container bg-white medium-size'>
                                    {/* <img className='w-100' src='images/photo.png' alt='photo' /> */}
                                </div>
                                <div className='media-body align-self-center'>
                                    <div className='d-flex align-items-center justify-content-start'>
                                        {/* <h2 className='my-0 requesterName mr-3'>John Doe</h2> */}
                                        {/* <span className='mic'>
                                            <button className='btn mr-2'>
                                                <i className='fa fa-microphone-slash red' aria-hidden='true'></i>
                                                <i className='fa fa-microphone hide' aria-hidden='true'></i>
                                            </button>
                                            <button className='btn'>
                                                <i className='fa fa-video-camera' aria-hidden='true'></i>
                                            </button>
                                        </span> */}
                                    </div>
                                    <span className='url-room small-size d-block'>
                                        {' '}
                                        <button
                                            className='navbar-toggler blue collapsed p-0 small-size navToggle'
                                            type='button'
                                            data-toggle='collapse'
                                            data-target='#navbarNav'
                                            aria-expanded='false'
                                            aria-label='Toggle navigation'></button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        {isAuth ? (
                            <div className='myAvilability d-flex align-items-start justify-content-center flex-column py-2 mr-4 pr-4'>
                                <div className='d-lg-none d-sm-block'>
                                    <p className='font14 mb-1'>Available for</p>
                                    <span className='small-size gray6 text-left'>
                                        7h 49m.
                                        <a className='blue' href='#'>
                                            {' '}
                                            Adjust
                                        </a>{' '}
                                    </span>
                                </div>
                                <div className='sm-none text-left'>
                                    <p className='font14 mb-1'>My Availability</p>
                                    {userInfo.availibility.meeter_availibility == 'yes' ? (
                                        <span className='small-size gray6 text-left'>
                                            Available for {userInfo.availibility.available_for.hours}h{' '}
                                            {userInfo.availibility.available_for.minutes}m.{' '}
                                        </span>
                                    ) : (
                                        <span className='small-size gray6 text-left'>Not Available</span>
                                    )}
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                        {/* <div className='myAvilability d-flex align-items-start justify-content-center flex-column py-2 mr-4 pr-4'>
                            <div className='d-lg-none d-sm-block'>
                                <p className='font14 mb-1'>Available for</p>
                                <span className='small-size gray6 text-left'>
                                    7h 49m.
                                    <a className='blue' href='#'>
                                        {' '}
                                        Adjust
                                    </a>{' '}
                                </span>
                            </div>
                            <div className='sm-none text-left'>
                                <p className='font14 mb-1'>My Availability</p>
                                {availibility == 'yes' ? (
                                    <span className='small-size gray6 text-left'>
                                        Available for {userInfo.availibility.available_for.hours}h{' '}
                                        {userInfo.availibility.available_for.minutes}m.{' '}
                                       
                                    </span>
                                ) : (
                                    <span className='small-size gray6 text-left'>Not Available</span>
                                )}
                            </div>
                        </div> */}
                    </div>
                    <div className='col-xs-5 d-flex ml-auto justify-content-end footerDetails'>
                        <div className='settings py-2 d-flex align-items-center mr-4 pr-4 sm-none borderRight'>
                            <button id='settingsBtn' className='btn medium-size gray8 p-0'>
                                <i className='fa fa-cog pr-1' aria-hidden='true'></i> Settings
                            </button>
                        </div>

                        <div className='mic py-2 mr-4 pr-4 d-flex align-items-center borderRight'>
                            <button className='btn mr-2' onClick={localAudioMute}>
                                {localAudio ? (
                                    <i className='fa fa-microphone' aria-hidden='true'></i>
                                ) : (
                                    <i className='fa fa-microphone-slash red' aria-hidden='true'></i>
                                )}
                            </button>
                            <button className='btn' onClick={localVideoMute}>
                                {localVideo ? (
                                    <i className='fa fa-video-camera' aria-hidden='true'></i>
                                ) : (
                                    // <i className='fa fa-video-camera hide' aria-hidden='true'></i>
                                    <i>
                                        <img src={muteVideo} style={{ width: '17px' }} />
                                    </i>
                                )}
                            </button>
                        </div>

                        <div className='exit py-2 d-flex align-items-center sm-none'>
                            <button className='btn small-size gray8 p-0' onClick={props.leaveRoom}>
                                <i className='fa fa-sign-out pr-3 font16' aria-hidden='true'></i>Exit Room
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
