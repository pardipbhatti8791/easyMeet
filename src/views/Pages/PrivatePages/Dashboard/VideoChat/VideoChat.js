import React, { useState, useEffect, useRef } from 'react';
import { getAccessToken } from '../../../../../redux/meetings/action';
import { useDispatch } from 'react-redux';
import { Video, connect } from 'twilio-video';

const VideoChat = () => {
    const localMedia = useRef(null);
    const remoteMedia = useRef(null);
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    const [identity, setIdentity] = useState(null);
    const [roomName, setRoomName] = useState('');
    const [tempIdentity, setTempIdentity] = useState('');
    const [roomNameErr, setRoomNameErr] = useState(false);
    const [previewTracks, setPreviewTracks] = useState(null);
    const [localMediaAvailable, setLocalMediaAvailable] = useState(false);
    const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
    const [activeRoom, setActiveRoom] = useState(null);
    const [token, setToken] = useState(null);
    const leaveRoom = () => {
        activeRoom.disconnect();
        setHasJoinedRoom(false);
        setLocalMediaAvailable(false);
    };
    const joinRoom = () => {
        if (!roomName.trim()) {
            setRoomNameErr(true);
            return;
        }
        console.log("Joining room '" + roomName + "'...");
        let connectOptions = {
            name: roomName
        };
        if (previewTracks) {
            connectOptions.tracks = previewTracks;
        }
        //alert('new participant trying as', roomName);
        // Video.connect(token, connectOptions).then(roomJoined, error => {
        //     alert('Could not connect to Twilio: ' + error.message);
        // });

        connect(
            token,
            connectOptions
        ).then(
            room => {
                roomJoined(room);
                console.log(`Successfully joined a Room: ${room}`);
                // room.on('participantConnected', participant => {
                //   console.log(`A remote Participant connected: {participant}`);
                //}
                //);
            },
            error => {
                console.error(`Unable to connect to Room: ${error.message}`);
            }
        );
    };

    const roomJoined = room => {
        console.log('room joined as', identity);
        setActiveRoom(room), setLocalMediaAvailable(true), setHasJoinedRoom(true);

        var previewContainer = localMedia.current;
        if (!previewContainer.querySelector('video')) {
            attachParticipantTracks(room.localParticipant, previewContainer);
        }
        console.log('here are the participants', room.participants);
        console.log('data provided by the room', room);

        //Participant joining room
        room.on('participantConnected', participant => {
            console.log("Joining a participant: '" + participant.identity + "'");
        });

        //Attach the Tracks of the room's participants.
        room.participants.forEach(participant => {
            console.log("Already in Room: '" + participant.identity + "'");

            var previewContainer = remoteMedia.current;
            attachParticipantTracks(participant, previewContainer);
        });

        // Attach participant’s tracks to DOM when they add a track
        room.on('trackAdded', (track, participant) => {
            console.log(participant.identity + ' added track: ' + track.kind);
            var previewContainer = remoteMedia.current;
            attachTracks([track], previewContainer);
        });

        // Detach participant’s track from DOM when they remove a track.
        room.on('trackRemoved', (track, participant) => {
            log(participant.identity + ' removed track: ' + track.kind);
            detachTracks([track]);
        });

        // Detach all participant’s track when they leave a room.
        room.on('participantDisconnected', participant => {
            console.log("Participant '" + participant.identity + "' left the room");
            detachParticipantTracks(participant);
        });

        // Once the local participant leaves the room, detach the Tracks
        //of all other participants, including that of the LocalParticipant.
        room.on('disconnected', () => {
            if (previewTracks) {
                previewTracks.forEach(track => {
                    track.stop();
                });
            }
            detachParticipantTracks(room.localParticipant);
            room.participants.forEach(detachParticipantTracks);
            setActiveRoom(null);
            setHasJoinedRoom(false), setLocalMediaAvailable(false);
        });
    };

    // Attach the Participant's Tracks to the DOM.
    const attachParticipantTracks = (participant, container) => {
        var tracks = Array.from(participant.tracks.values()).filter(track => track !== null);
        console.log('complete tracks');
        attachTracks(tracks, container);
    };

    const attachTracks = (tracks, container) => {
        tracks.forEach(track => {
            console.log('individual track', track);
            var count = 0;
            count + 1;
            container.appendChild(track.track.attach());
        });
    };
    const detachTracks = tracks => {
        tracks.forEach(track => {
            track.track.detach().forEach(detachedElement => {
                detachedElement.remove();
            });
        });
    };

    const detachParticipantTracks = participant => {
        var tracks = Array.from(participant.tracks.values());
        detachTracks(tracks);
    };

    const startVideo = () => {
        console.log('values are', roomName, tempIdentity);

        dispatch(getAccessToken(roomName, tempIdentity)).then(res => {
            setIdentity(res.data.data.result.identity);
            setToken(res.data.data.result.access_token);
            console.log('token recieved is', res.data.data.result.access_token);
            console.log('data from twilio', res);
        });
    };

    let showLocalTrack = localMediaAvailable ? (
        <div className='flex-item'>
            <div ref={localMedia} />{' '}
        </div>
    ) : (
        ''
    );
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
                    <div className='col-sm-6'>{showLocalTrack}</div>
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
