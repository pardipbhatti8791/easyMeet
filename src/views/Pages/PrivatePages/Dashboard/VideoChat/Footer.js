import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import muteVideo from '../../../../../assets/images/mutevideo.png';

const Footer = props => {
    const { room } = props.data;
    const requester_id = props.data.requester_id;
    const requester_email = props.data.requesterEmail;

    const userInfo = useSelector(state => state.auth.user);
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const roomInfo = useSelector(state => state.rooms);

    const participants = roomInfo.participants;
    console.log('participants', participants);
    const [localAudio, setLocalAudio] = useState(true);
    const [localVideo, setLocalVideo] = useState(true);
    const [showNav, setShowNav] = useState(false);
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
        <>
            <section className='container'>
                <nav
                    className='navbar-collapse fixed-top p-0 offcanvas-collapse'
                    className={
                        showNav == true
                            ? 'navbar-collapse fixed-top p-0 offcanvas-collapse open'
                            : 'navbar-collapse fixed-top p-0 offcanvas-collapse'
                    }>
                    <div className='modal-header bg-white py-4 borderBottomt d-lg-none d-xl-none d-flex'>
                        <button type='button' className='close medium-size fw-500 mr-auto pl-0' aria-label='Close'>
                            <span aria-hidden='true'>
                                <i className='fa fa-times mr-2' aria-hidden='true'></i> Close
                            </span>
                        </button>
                    </div>
                    <div className='w-100'>
                        <ul className='text-left list-unstyled small-size roomList w-100 mb-3'>
                            {isAuth
                                ? // <li>
                                  //     <div className='dropdown text-right'>
                                  //         <button
                                  //             className='btn p-0 dropdown-toggle'
                                  //             type='button'
                                  //             id='dropdownMenu2'
                                  //             data-toggle='dropdown'
                                  //             aria-haspopup='true'
                                  //             aria-expanded='false'>
                                  //             <i className='fa ml-2 gray6 fa-ellipsis-v' aria-hidden='true'></i>
                                  //         </button>
                                  //         <div className='dropdown-menu' aria-labelledby='dropdownMenu2'>
                                  //             <button className='dropdown-item small-size mb-1' type='button'>
                                  //                 Start meeting now
                                  //             </button>
                                  //             <button className='dropdown-item small-size mb-1' type='button'>
                                  //                 Move to top of wait list
                                  //             </button>
                                  //             <button className='dropdown-item small-size mb-1' type='button'>
                                  //                 Move to bottom of wait list
                                  //             </button>
                                  //             <button className='dropdown-item small-size' type='button'>
                                  //                 Reject user
                                  //             </button>
                                  //         </div>
                                  //     </div>
                                  //     <div className='waiting d-flex align-items-center text-left'>
                                  //         <div className='media text-left'>
                                  //             <div className='media-body align-self-center'>
                                  //                 <div className='d-flex align-items-center justify-content-start'>
                                  //                     <h2 className='my-0 requesterName mr-3'>Cody Fisher</h2>
                                  //                     <span className='mic'>
                                  //                         <button className='btn mr-2'>
                                  //                             <i
                                  //                                 className='fa fa-microphone-slash red'
                                  //                                 aria-hidden='true'></i>
                                  //                             <i className='fa fa-microphone hide' aria-hidden='true'></i>
                                  //                         </button>
                                  //                         <button className='btn'>
                                  //                             <i className='fa fa-video-camera' aria-hidden='true'></i>
                                  //                         </button>
                                  //                     </span>
                                  //                 </div>
                                  //                 <span className='url-room gray6 small-size d-block'>
                                  //                     codyfisher@mail.com
                                  //                 </span>
                                  //             </div>
                                  //         </div>
                                  //     </div>
                                  //     <div className='nextMeeting d-flex py-2 align-items-center'>
                                  //         <button className='btn blue p-0 blueBorder small-size w-100 py-2'>
                                  //             <i className='fa small-size fa-forward' aria-hidden='true'></i> Next Meeting
                                  //         </button>
                                  //     </div>
                                  //     <div className='breakLine my-2'></div>
                                  //     <div className='request-summary text-left noMobileMargin noMobilePadding'>
                                  //         <h3 className='small-size mb-2'>Request Summary:</h3>
                                  //         <span className='small-size' style={{ opacity: '0.6' }}>
                                  //             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                  //             tempor incididunt ut labore et dolore magna aliqua. In massa tempor nec
                                  //             feugiat. Vitae suscipit tellus mauris a. Cursus metus aliquam eleifend mi in
                                  //             nulla posuerenecta.{' '}
                                  //         </span>
                                  //     </div>
                                  // </li>
                                  ''
                                : ''}
                        </ul>
                        <h3 className='small-size text-left pl-3 mb-3'>Wait list:</h3>

                        <ul className='text-left list-unstyled small-size roomList w-100 waitList'>
                            {participants == null
                                ? ''
                                : participants.map((participant, key) => (
                                      <li>
                                          <div className='dropdown text-right'>
                                              <button
                                                  className='btn p-0 dropdown-toggle'
                                                  type='button'
                                                  id='dropdownMenu2'
                                                  data-toggle='dropdown'
                                                  aria-haspopup='true'
                                                  aria-expanded='false'>
                                                  <i className='fa ml-2 gray6 fa-ellipsis-v' aria-hidden='true'></i>
                                              </button>
                                              <div className='dropdown-menu' aria-labelledby='dropdownMenu2'>
                                                  <button className='dropdown-item small-size mb-1' type='button'>
                                                      Start meeting now
                                                  </button>
                                                  <button className='dropdown-item small-size mb-1' type='button'>
                                                      Move to top of wait list
                                                  </button>
                                                  <button className='dropdown-item small-size mb-1' type='button'>
                                                      Move to bottom of wait list
                                                  </button>
                                                  <button className='dropdown-item small-size' type='button'>
                                                      Reject user
                                                  </button>
                                              </div>
                                          </div>
                                          <div className='waiting d-flex align-items-center text-left'>
                                              <div
                                                  className='media text-left'
                                                  data-toggle='collapse'
                                                  data-target='#collapse1'
                                                  aria-expanded='true'>
                                                  <div className='align-self-center text-center mr-2 avatar-container bg-white medium-size'>
                                                      <span>
                                                          {participant.requester_name.substr(0, 1).toUpperCase()}
                                                      </span>
                                                  </div>
                                                  <div className='media-body align-self-center'>
                                                      <div className='d-flex align-items-center justify-content-start'>
                                                          <h2 className='my-0 requesterName mr-3'>
                                                              {participant.requester_name}
                                                          </h2>
                                                      </div>
                                                      <span className='url-room gray6 small-size d-block'>
                                                          {participant.requester_email}
                                                      </span>
                                                  </div>
                                              </div>
                                          </div>
                                          <div
                                              className='request-summary text-left noMobileMargin mt-3 collapse noMobilePadding'
                                              id='collapse1'
                                              aria-labelledby='headingOne'>
                                              <h3 className='small-size mb-2'>Request Summary:</h3>
                                              <span className='small-size' style={{ opacity: '0.6' }}>
                                                  {participant.summary}{' '}
                                              </span>
                                          </div>
                                      </li>
                                  ))}
                        </ul>
                    </div>
                </nav>
            </section>

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
                                            <span>{participants == null ? '' : participants.length}</span> users
                                            waiting.{' '}
                                            <button
                                                class='navbar-toggler blue collapsed p-0 small-size navToggle'
                                                type='button'
                                                data-toggle='collapse'
                                                data-target='#navbarNav'
                                                aria-expanded='false'
                                                aria-label='Toggle navigation'
                                                onClick={() => {
                                                    setShowNav(!showNav);
                                                }}>
                                                {showNav ? 'Hide Details' : 'Show details'}
                                            </button>
                                        </span>
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
        </>
    );
};
export default Footer;
