import React, { useState, useRef, useEffect } from 'react';
import { meetingStatus, getAccessToken, getMeetingRoomStatus } from '../../../../../redux/rooms/action';
import { useDispatch, useSelector } from 'react-redux';
import PublicPage from './PublicPage';
import Footer from './Footer';
import { queryString } from '../../../../../utils/qs';
import { gpAxios } from '../../../../../utils/gpAxios';

const { connect, createLocalTracks, createLocalVideoTrack, isSupported } = require('twilio-video');
const VideoChat = props => {
    const dispatch = useDispatch();
    const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
    const [activeRoom, setActiveRoom] = useState(null);
    const [isRemote, setIsRemote] = useState(false);
    const [twilioRoom, set_twilioRoom] = useState(null);
    const [requester, set_requester] = useState(null);
    const [requesterId, setRequesterId] = useState(null);
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const userInfo = useSelector(state => state.auth.user);

    const localMedia = useRef(null);
    const remoteMedia = useRef(null);

    const footerData = {
        room: activeRoom
    };

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        const { signature } = await queryString(props.location.search);
        // eslint-disable-next-line no-undef
        const decrypted = CryptoJS.AES.decrypt(signature, 'guguilovu');
        // eslint-disable-next-line no-undef
        var plaintext = decrypted.toString(CryptoJS.enc.Utf8);
        const { data } = await gpAxios.post('/generate-token-decode', { token: plaintext });

        if (
            data.hasOwnProperty('twillioToken') &&
            data.hasOwnProperty('roomName') &&
            data.hasOwnProperty('requesterId')
        ) {
            set_requester(data.requesterEmail);
            set_twilioRoom(data.roomName);
            setRequesterId(data.requesterId);
            if (isAuth) {
                const userEmail = userInfo.meeter_email;
                if (userEmail != data.hostEmail) {
                    console.log('userEmail', userEmail, 'and hostemail', data.hostEmail);

                    dispatch(getAccessToken(data.roomName, data.requesterEmail))
                        .then(res => {
                            const accessToken = res.data.data.result.access_token;
                            dispatch(getMeetingRoomStatus(data.roomName))
                                .then(res => {
                                    joinRoom(data.roomName, accessToken);
                                })
                                .catch(err => {
                                    alert('Room not exist');
                                });
                        })
                        .catch(e => {
                            alert('Unauthorized');
                        });
                } else {
                    joinRoom(data.roomName, data.twillioToken, data.requesterId);
                }
            }
        }
    };

    const joinRoom = (roomName, accessToken, requesterId) => {
        createLocalTracks({
            audio: true,
            video: { width: 1920, height: 1080 }
        })
            .then(localTracks => {
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
                roomJoined(room, requesterId);
            });
    };
    const roomJoined = (room, requesterId) => {
        const data = {
            status_category: 'single',
            status_type: 'in_meeting',
            requester_id: requesterId
        };
        const localParticipant = room.localParticipant;
        if (isAuth) {
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

        // local media tracks attaching to dom
        createLocalVideoTrack()
            .then(track => {
                //removeTracks(track);
                localMedia.current.appendChild(track.attach());
            })
            .then(err => {
                //  console.log(err);
            });
    };

    const startVideo = () => {
        dispatch(getAccessToken(twilioRoom, requester))
            .then(res => {
                const accessToken = res.data.data.result.access_token;
                dispatch(getMeetingRoomStatus(twilioRoom))
                    .then(res => {
                        joinRoom(twilioRoom, accessToken);
                    })
                    .catch(err => {
                        alert('Room not exist');
                    });
            })
            .catch(e => {
                alert('Unauthorized');
            });
    };
    const leaveRoom = () => {
        activeRoom.on('disconnected', () => {
            activeRoom.localParticipant.tracks.forEach(publication => {
                publication.track.stop();
                const attachedElements = publication.track.detach();
                attachedElements.forEach(element => element.stop());
            });
        });

        activeRoom.disconnect();
        setHasJoinedRoom(false);
        const data = {
            status_category: 'single',
            status_type: 'completed',
            requester_id: requesterId
        };
        if (isAuth) {
            dispatch(meetingStatus(data)).then(res => {
                // console.log('response', res);
            });
            // window.location.href = '/dashboard';
        }
    };

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

            {!isAuth && <div className='conatiner'>{hasJoinedRoom ? '' : <PublicPage startVideo={startVideo} />}</div>}

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
