import React, { useState, useRef, useEffect } from 'react';
import {
    meetingStatus,
    getAccessToken,
    getMeetingRoomStatus,
    getRoom,
    hostAvailable
} from '../../../../../redux/rooms/action';
import { useDispatch, useSelector } from 'react-redux';

import Footer from './Footer';

const { connect, createLocalTracks } = require('twilio-video');
const VideoChat = props => {
    const dispatch = useDispatch();
    const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
    const [activeRoom, setActiveRoom] = useState(null);
    const [isRemote, setIsRemote] = useState(false);
    const [urlData, setUrlData] = useState(null);
    const [requesterEmail, setRequesterEmail] = useState(null);
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const userInfo = useSelector(state => state.auth.user);
    const roomInfo = useSelector(state => state.rooms);

    const localMedia = useRef(null);
    const remoteMedia = useRef(null);
    let systemTracks;

    const footerData = {
        room: activeRoom
    };

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        let signature = props.match.params.signature;

        setUrlData(signature);
        dispatch(getRoom(signature)).then(res => {
            setRequesterEmail(res.data.data.meeting_requester.requester_email);
            if (res.data.status === true) {
                if (isAuth) {
                    dispatch(getAccessToken(signature, userInfo.meeter_email)).then(res => {
                        let accessToken = res.data.data.result.access_token;
                        joinRoom(signature, accessToken);
                    });
                } else {
                    let requester_email = res.data.data.meeting_requester.requester_email;

                    dispatch(getAccessToken(signature, requester_email)).then(res => {
                        let accessToken = res.data.data.result.access_token;
                        dispatch(getMeetingRoomStatus(signature))
                            .then(res => {
                                //  hostAvaiable = true;
                                joinRoom(signature, accessToken);
                            })
                            .catch(err => {
                                console.log('room not exist');

                                dispatch(hostAvailable(false));
                            });
                    });
                }
            } else {
                alert('Room not exist');
            }
        });
    };

    // const checkToken = async () => {
    //     const { signature } = await queryString(props.location.search);
    //     // eslint-disable-next-line no-undef
    //     const decrypted = CryptoJS.AES.decrypt(signature, 'guguilovu');
    //     // eslint-disable-next-line no-undef
    //     var plaintext = decrypted.toString(CryptoJS.enc.Utf8);
    //     const { data } = await gpAxios.post('/generate-token-decode', { token: plaintext });

    //     if (
    //         data.hasOwnProperty('twillioToken') &&
    //         data.hasOwnProperty('roomName') &&
    //         data.hasOwnProperty('requesterId')
    //     ) {
    //         set_requester(data.requesterEmail);
    //         set_twilioRoom(data.roomName);
    //         setRequesterId(data.requesterId);
    //         if (isAuth) {
    //             const userEmail = userInfo.meeter_email;
    //             if (userEmail != data.hostEmail) {
    //                 dispatch(getAccessToken(data.roomName, data.requesterEmail))
    //                     .then(res => {
    //                         const accessToken = res.data.data.result.access_token;
    //                         dispatch(getMeetingRoomStatus(data.roomName))
    //                             .then(res => {
    //                                 joinRoom(data.roomName, accessToken);
    //                             })
    //                             .catch(err => {
    //                                 alert('Room not exist');
    //                             });
    //                     })
    //                     .catch(e => {
    //                         alert('Unauthorized');
    //                     });
    //             } else {
    //                 joinRoom(data.roomName, data.twillioToken, data.requesterId);
    //             }
    //         }
    //     }
    // };

    const joinRoom = (roomName, accessToken) => {
        createLocalTracks({
            audio: true,
            video: { width: 1920, height: 1080 }
        })
            .then(localTracks => {
                //console.log('sysTrack', localTracks);
                systemTracks = localTracks[1];

                return connect(
                    accessToken,
                    {
                        name: roomName,
                        tracks: localTracks
                    }
                );
            })
            .then(room => {
                // console.log(`Connected to Room: ${room.name}`);
                roomJoined(room);
            });
    };
    const roomJoined = room => {
        if (isAuth) {
            const data = {
                status_category: 'single',
                status_type: 'in_meeting',
                requester_id: userInfo.id
            };
            const localParticipant = room.localParticipant;

            dispatch(meetingStatus(data)).then(res => {});
        }

        setActiveRoom(room);

        setHasJoinedRoom(true);

        // Log your Client's LocalParticipant in the Room
        //console.log(`Connected to the Room as LocalParticipant "${localParticipant.identity}"`);

        // Log any Participants already connected to the Room
        room.participants.forEach(participant => {
            // console.log(`Participant "${participant.identity}" is connected to the Room`);
            setIsRemote(true);
        });

        // Log new Participants as they connect to the Room
        room.once('participantConnected', participant => {
            // console.log(`Participant "${participant.identity}" has connected to the Room`);
        });

        // Log Participants as they disconnect from the Room
        room.once('participantDisconnected', participant => {
            // console.log(`Participant "${participant.identity}" has disconnected from the Room`);
            setIsRemote(false);
        });

        room.on('participantConnected', participant => {
            // console.log(`Participant connected: ${participant.identity}`);
            setIsRemote(true);
        });

        room.on('participantDisconnected', participant => {
            // console.log(`   Participant disconnected: ${participant.identity}`);
        });

        // Attach the Participant's Media to a <div> element.
        room.on('participantConnected', participant => {
            //console.log(`Participant "${participant.identity}" connected`);
            //seIsRemote(true);
            participant.tracks.forEach(publication => {
                if (publication.isSubscribed) {
                    const track = publication.track;
                    remoteMedia.current.appendChild(track.attach());
                }
            });

            participant.on('trackSubscribed', track => {
                // console.log('trackSubscribed', track);
                remoteMedia.current.appendChild(track.attach());
            });
        });
        room.participants.forEach(participant => {
            participant.tracks.forEach(publication => {
                if (publication.track) {
                    //  console.log('publication track', track);
                    remoteMedia.current.appendChild(publication.track.attach());
                }
            });

            participant.on('trackSubscribed', track => {
                remoteMedia.current.appendChild(track.attach());
            });
        });

        const handleTrackDisabled = track => {
            track.on('disabled', () => {
                /* Hide the associated <video> element and show an avatar image. */
                console.log('remote mute their video');
            });
        };

        room.participants.forEach(participant => {
            participant.tracks.forEach(publication => {
                if (publication.isSubscribed) {
                    handleTrackDisabled(publication.track);
                }
                publication.on('subscribed', handleTrackDisabled);
            });
        });

        localMedia.current.appendChild(systemTracks.attach());
        // local media tracks attaching to dom
        // createLocalVideoTrack()
        //     .then(track => {
        //         //removeTracks(track);
        //         localMedia.current.appendChild(track.attach());
        //     })
        //     .then(err => {
        //         //  console.log(err);
        //     });
    };

    // const startVideo = () => {
    //     dispatch(getAccessToken(signature, requester))
    //         .then(res => {
    //             const accessToken = res.data.data.result.access_token;
    //             dispatch(getMeetingRoomStatus(twilioRoom))
    //                 .then(res => {
    //                     joinRoom(signature, accessToken);
    //                 })
    //                 .catch(err => {
    //                     alert('Room not exist');
    //                 });
    //         })
    //         .catch(e => {
    //             alert('Unauthorized');
    //         });
    // };
    const leaveRoom = () => {
        activeRoom.on('disconnected', room => {
            room.localParticipant.tracks.forEach(publication => {
                const attachedElements = publication.track.detach();
                attachedElements.forEach(element => element.remove());
            });
        });
        activeRoom.localParticipant.videoTracks.forEach(publication => {
            publication.track.stop();
            publication.unpublish();
        });

        activeRoom.disconnect();
        setHasJoinedRoom(false);
        if (isAuth) {
            const data = {
                status_category: 'single',
                status_type: 'completed',
                requester_id: userInfo.id
            };

            dispatch(meetingStatus(data)).then(res => {
                // console.log('response', res);
            });
            // window.location.href = '/dashboard';
        }
    };

    if (roomInfo.hostAvailable == false) {
        let clear = setInterval(() => {
            dispatch(getMeetingRoomStatus(urlData)).then(res => {
                dispatch(hostAvailable(true));
                stopfunction();
                dispatch(getAccessToken(urlData, requesterEmail)).then(res => {
                    joinRoom(urlData, res.data.data.result.access_token);
                });
            });
            //console.log('paramyer to roomcheck', urlData);
        }, 3000);
        const stopfunction = () => {
            clearInterval(clear);
        };
    }

    let remoteMediaContainer = isRemote ? (
        <div
            className='media mainRoomMedia personal-details media-body text-center d-block mb-4 remotevideodiv'
            ref={remoteMedia}></div>
    ) : (
        ''
    );

    return (
        <>
            {hasJoinedRoom ? (
                <div className='d-lg-none d-xl-none d-flex p-3 footerDetails bg-white'>
                    <div className='exit py-2 ml-auto d-flex align-items-center'>
                        <button className='btn small-size gray8 p-0' onClick={leaveRoom}>
                            <i className='fa fa-sign-out pr-1 font16' aria-hidden='true'></i>Exit Room
                        </button>
                    </div>
                </div>
            ) : (
                ''
            )}

            {/* {!isAuth && (
                <div className='conatiner'>
                    {hasJoinedRoom && roomExist != false ? '' : <PublicPage startVideo={startVideo} />}
                </div>
            )} */}
            {roomInfo.hostAvailable ? (
                ''
            ) : (
                <div className='bggray withSideBar meetRoom waitingHost'>
                    <div className='host text-right  d-none d-lg-block videodiv flex-item' ref={localMedia}></div>
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
            )}
            {hasJoinedRoom ? (
                <div className='bgdark withSideBar meetRoom waitingHost'>
                    <div className='host text-right  d-none d-lg-block videodiv flex-item' ref={localMedia}></div>
                    <div className='container mainRoom'>
                        <div className='row justify-content-center align-items-center h-100'>
                            <div>
                                {/* <div
                                    className='media mainRoomMedia personal-details media-body text-center d-block mb-4 remotevideodiv'
                                    ref={remoteMedia}></div> */}
                                {remoteMediaContainer}
                                {isRemote ? (
                                    ''
                                ) : (
                                    <div className='media mainRoomMedia personal-details media-body text-center d-block mb-4'>
                                        <div className='text-center default-opacity m-auto avatar-container'></div>
                                        <h2 className='font36 mt-4 mb-2 mb-0'>Waiting for the participant.</h2>
                                        <p className='edit-bio medium-size gray8' href='#'></p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={'mt-5'}>
                    <h1>{isAuth ? 'Please wait while we are loading room' : ''}</h1>
                </div>
            )}

            {hasJoinedRoom ? <Footer data={footerData} leaveRoom={leaveRoom} /> : ''}
        </>
    );
};
export default VideoChat;
