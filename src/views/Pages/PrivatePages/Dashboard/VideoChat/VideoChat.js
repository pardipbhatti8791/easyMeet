import React, { useState, useEffect, useRef } from 'react';
import { setAccessToken, twilioLogout, getAccessToken, meetingStatus } from '../../../../../redux/rooms/action';
import { useDispatch, useSelector } from 'react-redux';

const { connect, createLocalTracks, createLocalVideoTrack, isSupported } = require('twilio-video');
const VideoChat = props => {
    const localMedia = useRef(null);
    const remoteMedia = useRef(null);
    const dispatch = useDispatch();
    const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
    const [activeRoom, setActiveRoom] = useState(null);
    const userInfo = useSelector(state => state.auth.user);
    const twilioToken = useSelector(state => state.rooms.token);
    const userIdentity = userInfo.meeter_email;
    const userId = userInfo.id;
    console.log('userid', userId);
    const roomName = props.match.params.roomName;
    console.log('room name in url is', roomName);
    const leaveRoom = props => {
        activeRoom.on('disconnected', () => {
            // Detach the local media elements
            activeRoom.localParticipant.tracks.forEach(publication => {
                publication.track.stop();
                const attachedElements = publication.track.detach();
                attachedElements.forEach(element => element.stop());
                console.log('removing local media');
            });
        });
        activeRoom.disconnect();
        //        setToken(null);
        const data = {
            status_category: 'single',
            status_type: 'completed',
            requester_id: userId
        };

        dispatch(meetingStatus(data)).then(res => {
            console.log('response', res);
        });
        setActiveRoom(null);
        localStorage.removeItem('twilioacesstoken');
        dispatch(twilioLogout());
        setHasJoinedRoom(false);
    };

    const joinRoom = (roomName, accessToken) => {
        console.log("Joining room '" + roomName + "'...");
        const tokenToBeSend = twilioToken == null ? accessToken : twilioToken;
        if (isSupported) {
            createLocalTracks({
                audio: true,
                video: { width: 640 }
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
                    console.log(`Connected to Room: ${room.name}`);
                    roomJoined(room);
                });
        } else {
            alert('Browser not supported');
        }
    };

    const roomJoined = room => {
        const data = {
            status_category: 'single',
            status_type: 'in_meeting',
            requester_id: userId
        };

        dispatch(meetingStatus(data)).then(res => {
            console.log('response', res);
        });
        setActiveRoom(room);
        setHasJoinedRoom(true);

        //local media tracks attaching to dom
        // createLocalVideoTrack()
        //     .then(track => {
        //         const localMediaContainer = localMedia.current;
        //         console.log('attaching local media', track);
        //         localMedia.current.appendChild(track.attach());
        //     })
        //     .then(err => {
        //         console.log(err);
        //     });
        // Log your Client's LocalParticipant in the Room
        const localParticipant = room.localParticipant;
        console.log(`Connected to the Room as LocalParticipant "${localParticipant.identity}"`);

        // Log any Participants already connected to the Room
        room.participants.forEach(participant => {
            console.log(`Participant "${participant.identity}" is connected to the Room`);
        });

        // Log new Participants as they connect to the Room
        room.once('participantConnected', participant => {
            console.log(`Participant "${participant.identity}" has connected to the Room`);
        });

        // Log Participants as they disconnect from the Room
        room.once('participantDisconnected', participant => {
            console.log(`Participant "${participant.identity}" has disconnected from the Room`);
        });

        room.on('participantConnected', participant => {
            console.log(`Participant connected: ${participant.identity}`);
        });

        room.on('participantDisconnected', participant => {
            console.log(`   Participant disconnected: ${participant.identity}`);
        });

        // Attach the Participant's Media to a <div> element.
        room.on('participantConnected', participant => {
            console.log(`Participant "${participant.identity}" connected`);

            participant.tracks.forEach(publication => {
                if (publication.isSubscribed) {
                    const track = publication.track;
                    remoteMedia.current.appendChild(track.attach());
                }
            });

            participant.on('trackSubscribed', track => {
                console.log('trackSubscribed', track);
                remoteMedia.current.appendChild(track.attach());
            });
        });
        room.participants.forEach(participant => {
            participant.tracks.forEach(publication => {
                if (publication.track) {
                    console.log('publication track', track);
                    remoteMedia.current.appendChild(publication.track.attach());
                }
            });

            participant.on('trackSubscribed', track => {
                remoteMedia.current.appendChild(track.attach());
            });
        });
    };

    const startVideo = () => {
        if (twilioToken == null) {
            dispatch(getAccessToken(roomName, userIdentity)).then(res => {
                localStorage.setItem('twilioacesstoken', res.data.data.result.access_token);

                const accessToken = res.data.data.result.access_token;
                dispatch(setAccessToken(res.data.data.result.access_token));
                joinRoom(roomName, accessToken);
            });
        } else {
            console.log('join to room   ');
            joinRoom(roomName);
        }
    };

    let joinOrLeaveRoomButton = hasJoinedRoom ? (
        <button label='Leave Room' className='btn btn-warning' onClick={leaveRoom}>
            Leave room
        </button>
    ) : (
        ''
    );

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-6'>
                        {hasJoinedRoom ? (
                            ''
                        ) : (
                            <button className='btn btn-primary' onClick={startVideo}>
                                Start Call
                            </button>
                        )}
                    </div>
                </div>

                <div className='row'> {joinOrLeaveRoomButton}</div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <div className='card' ref={localMedia}></div>
                    </div>
                    <div className='col-sm-6'>
                        <div className='card' ref={remoteMedia}></div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default VideoChat;
