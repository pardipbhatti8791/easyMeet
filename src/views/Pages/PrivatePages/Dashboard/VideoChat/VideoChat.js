import React, { useState, useEffect, useRef } from 'react';
import { getAccessToken } from '../../../../../redux/meetings/action';
import { useDispatch } from 'react-redux';
import CryptoJS from 'crypto-js';
const { connect, createLocalTracks, createLocalVideoTrack, isSupported } = require('twilio-video');
const VideoChat = props => {
    const localMedia = useRef(null);
    const remoteMedia = useRef(null);

    const dispatch = useDispatch();
    const [identity, setIdentity] = useState(null);
    const [tempIdentity, setTempIdentity] = useState('');
    const [roomName, setRoomName] = useState('');
    const [roomNameErr, setRoomNameErr] = useState(false);
    const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
    const [activeRoom, setActiveRoom] = useState(null);
    const [token, setToken] = useState(null);
    useEffect(() => {
        var bytes = CryptoJS.AES.decrypt(props.match.params.identity, 'my-secret-key@123');
        var userIdentity = bytes.toString(CryptoJS.enc.Utf8);
        console.log('decrypted data is', userIdentity);
        if (token == null) {
            dispatch(getAccessToken(userIdentity, userIdentity)).then(res => {
                setToken(res.data.data.result.access_token);
                console.log(token);
                joinRoom(res.data.data.result.access_token);
            });
        }
    }, [token]);
    const leaveRoom = props => {
        activeRoom.on('disconnected', room => {
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
        setHasJoinedRoom(false);
    };

    const joinRoom = roomName => {
        setToken(roomName);
        console.log('generating token', token);
        if (!roomName.trim()) {
            setRoomNameErr(true);
            return;
        }

        console.log("Joining room '" + roomName + "'...");

        if (isSupported) {
            createLocalTracks({
                audio: true,
                video: true
            })
                .then(localTracks => {
                    console.log('tokensss', token);
                    return connect(
                        token,
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
        setActiveRoom(room);
        setHasJoinedRoom(true);

        //local media tracks attaching to dom
        createLocalVideoTrack()
            .then(track => {
                const localMediaContainer = localMedia.current;
                console.log('attaching local media', track);
                localMedia.current.appendChild(track.attach());
            })
            .then(err => {
                console.log(err);
            });
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
                    console.log('first track', track);
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

    // useEffect(() => {
    //     dispatch(getAccessToken(roomName, tempIdentity)).then(res => {
    //         setIdentity(res.data.data.result.identity);
    //         setToken(res.data.data.result.access_token);
    //     });
    // });
    const startVideo = () => {};

    let joinOrLeaveRoomButton = hasJoinedRoom ? (
        <button label='Leave Room' onClick={leaveRoom} className='btn btn-warning'>
            Leave room
        </button>
    ) : (
        <button label='Join Room' className='btn btn-primary' onClick={joinRoom}>
            Join room
        </button>
    );

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-6'>
                        <button className='btn btn-primary' onClick={startVideo}>
                            getToken
                        </button>
                    </div>
                    <div className='col-sm-6'>
                        <input
                            placeholder='Room Name'
                            name='roomName'
                            onChange={() => {
                                setRoomName(event.target.value);
                            }}
                        />
                        {roomNameErr ? (
                            <span className='medium-size text-left' style={{ color: '#ff2828' }}>
                                Room name is required
                            </span>
                        ) : (
                            ''
                        )}
                        <input
                            placeholder='identity'
                            name='tempIdentity'
                            onChange={() => {
                                setTempIdentity(event.target.value);
                            }}
                        />
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
