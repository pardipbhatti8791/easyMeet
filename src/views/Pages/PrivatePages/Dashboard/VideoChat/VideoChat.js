import React, { useState, useEffect, useRef } from 'react';
import { getAccessToken } from '../../../../../redux/meetings/action';
import { useDispatch } from 'react-redux';
const { connect, createLocalTracks, createLocalVideoTrack } = require('twilio-video');
const VideoChat = () => {
    const localMedia = useRef(null);
    const remoteMedia = useRef(null);
    const dispatch = useDispatch();
    const [identity, setIdentity] = useState(null);
    const [tempIdentity, setTempIdentity] = useState('');
    const [roomName, setRoomName] = useState('');
    const [roomNameErr, setRoomNameErr] = useState(false);
    const [previewTracks, setPreviewTracks] = useState(null);
    const [localMediaAvailable, setLocalMediaAvailable] = useState(false);
    const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
    const [activeRoom, setActiveRoom] = useState(null);
    const [token, setToken] = useState(null);
    const leaveRoom = () => {
        activeRoom.on('disconnected', room => {
            // Detach the local media elements
            room.localParticipant.tracks.forEach(publication => {
                const attachedElements = publication.track.detach();
                attachedElements.forEach(element => element.remove());
            });
        });
        activeRoom.disconnect();
        setToken(null);
        setHasJoinedRoom(false);
    };

    const joinRoom = () => {
        if (!roomName.trim()) {
            setRoomNameErr(true);
            return;
        }
        console.log("Joining room '" + roomName + "'...");
        let connectOptions = {
            name: roomName,
            video: true,
            audio: true
        };
        if (previewTracks) {
            connectOptions.tracks = previewTracks;
        }

        createLocalTracks({
            audio: true,
            video: { width: 640 }
        })
            .then(localTracks => {
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
    };

    const roomJoined = room => {
        setActiveRoom(room);
        setHasJoinedRoom(true);

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
                remoteMedia.current.appendChild(track.attach());
            });
        });
        room.participants.forEach(participant => {
            participant.tracks.forEach(publication => {
                if (publication.track) {
                    remoteMedia.current.appendChild(publication.track.attach());
                }
            });

            participant.on('trackSubscribed', track => {
                remoteMedia.current.appendChild(track.attach());
            });
        });
    };

    const startVideo = () => {
        dispatch(getAccessToken(roomName, tempIdentity)).then(res => {
            setIdentity(res.data.data.result.identity);
            setToken(res.data.data.result.access_token);
        });
        createLocalVideoTrack().then(track => {
            const localMediaContainer = localMedia.current;
            console.log('attaching local media', track);
            localMedia.current.appendChild(track.attach());
        });
    };

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
                            startVideo
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
                    <div className='col-sm-6' ref={localMedia}></div>
                    <div className='col-sm-6'>
                        <div className='flex-item' id='remote-media' ref={remoteMedia} />
                        {
                            // div for localmedia
                        }
                    </div>
                </div>
            </div>
        </>
    );
};
export default VideoChat;
