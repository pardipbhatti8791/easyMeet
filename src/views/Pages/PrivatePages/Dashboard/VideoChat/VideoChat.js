import React, { useState, useRef, useEffect } from 'react';
import {
    setAccessToken,
    twilioLogout,
    getAccessToken,
    meetingStatus,
    getMeetingRoomStatus
} from '../../../../../redux/rooms/action';
import { useDispatch, useSelector } from 'react-redux';
import Footer from './Footer';

const { connect, createLocalTracks, createLocalVideoTrack, isSupported } = require('twilio-video');
const VideoChat = props => {
    const dispatch = useDispatch();
    const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
    const [activeRoom, setActiveRoom] = useState(null);
    const [isRemote, setIsRemote] = useState(false);
    const userInfo = useSelector(state => state.auth.user);
    const twilioToken = useSelector(state => state.rooms.token);
    const userIdentity = userInfo.meeter_email;
    const userId = userInfo.id;
    const localMedia = useRef(null);
    const remoteMedia = useRef(null);
    const roomName = props.match.params.roomName;
    useEffect(() => {
        if (twilioToken !== null && hasJoinedRoom === false) {
            joinRoom(roomName, twilioToken);
        }
    }, []);
    const joinRoom = (roomName, accessToken) => {
        //console.log("Joining room '" + roomName + "'...");
        // console.log('join room called');
        const tokenToBeSend = twilioToken == null ? accessToken : twilioToken;

        createLocalTracks({
            audio: true,
            video: { width: 1920, height: 1080 }
        })
            .then(localTracks => {
                return connect(
                    tokenToBeSend,
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
        const data = {
            status_category: 'single',
            status_type: 'in_meeting',
            requester_id: userId
        };
        const localParticipant = room.localParticipant;
        dispatch(meetingStatus(data)).then(res => {});
        setActiveRoom(room);

        setHasJoinedRoom(true);

        // Log your Client's LocalParticipant in the Room
        //console.log(`Connected to the Room as LocalParticipant "${localParticipant.identity}"`);

        // Log any Participants already connected to the Room
        room.participants.forEach(participant => {
            //console.log(`Participant "${participant.identity}" is connected to the Room`);
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
            console.log(`Participant "${participant.identity}" connected`);
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

        //Handle Remote Media Unmute Events

        // room.participants.forEach(participant => {
        //     participant.tracks.forEach(publication => {
        //         if (publication.isSubscribed) {
        //             handleTrackEnabled(publication.track);
        //         }
        //         publication.on('subscribed', handleTrackEnabled);
        //     });
        // });

        // const handleTrackEnabled = track => {
        //     track.on('enabled', () => {
        //         console.log('enabled video track');
        //     });
        // };

        //local media tracks attaching to dom
        createLocalVideoTrack()
            .then(track => {
                const localMediaContainer = localMedia.current;
                // console.log('attaching local media', track);
                localMedia.current.appendChild(track.attach());
            })
            .then(err => {
                //  console.log(err);
            });
    };

    const startVideo = () => {
        if (twilioToken == null) {
            dispatch(getAccessToken(roomName, userIdentity)).then(res => {
                localStorage.setItem('twilioacesstoken', res.data.data.result.access_token);
                const accessToken = res.data.data.result.access_token;
                dispatch(getMeetingRoomStatus(roomName))
                    .then(res => {
                        dispatch(setAccessToken(res.data.data.result.access_token));
                        joinRoom(roomName, accessToken);
                    })
                    .catch(err => {
                        alert('Room not exist');
                        localStorage.removeItem('twilioacesstoken');
                        dispatch(twilioLogout());
                    });
            });
        }
        // else {
        //     // console.log('join to room   ');
        //     joinRoom(roomName);
        // }
    };

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-6'>
                        {twilioToken === null ? (
                            hasJoinedRoom ? (
                                ''
                            ) : (
                                <button className='btn btn-primary' onClick={startVideo}>
                                    Start Call
                                </button>
                            )
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
            {/* {hasJoinedRoom ? <Room room={activeRoom} /> : ''} */}
            {hasJoinedRoom ? (
                <div className='bgdark withSideBar meetRoom waitingHost'>
                    <div className='host text-right  d-none d-lg-block videodiv flex-item' ref={localMedia}></div>
                    <div className='container mainRoom'>
                        <div className='row justify-content-center align-items-center h-100'>
                            <div>
                                <div
                                    className='media mainRoomMedia personal-details media-body text-center d-block mb-4 remotevideodiv'
                                    ref={remoteMedia}></div>

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
                ''
            )}

            {hasJoinedRoom ? <Footer room={activeRoom} setHasJoinedRoom={setHasJoinedRoom} /> : ''}
        </>
    );
};
export default VideoChat;
