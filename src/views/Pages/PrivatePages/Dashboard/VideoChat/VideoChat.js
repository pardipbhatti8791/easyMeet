import React, { useState, useEffect, useRef } from 'react';
import { getAccessToken } from '../../../../../redux/meetings/action';
import { useDispatch } from 'react-redux';
import Video from 'twilio-video';

const VideoChat = () => {
    const localMedia = useRef(null);
    const remoteMedia = useRef(null);
    const dispatch = useDispatch();
    const [identity, setIdentity] = useState(null);
    const [roomName, setRoomName] = useState('');
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
        alert('new participant trying as', roomName);
        Video.connect(token, connectOptions).then(roomJoined, error => {
            alert('Could not connect to Twilio: ' + error.message);
        });
    };

    const roomJoined = room => {
        console.log('room joined as', identity);
        setActiveRoom(room), setLocalMediaAvailable(true), setHasJoinedRoom(true);

        var previewContainer = localMedia.current;
        if (!previewContainer.querySelector('video')) {
            attachParticipantTracks(room.localParticipant, previewContainer);
        }
        console.log('here are the participants', room.participant);
        console.log('data provided by the room', room);

        //Attach the Tracks of the room's participants.
        room.participants.forEach(participant => {
            console.log("Already in Room: '" + participant.identity + "'");
            var previewContainer = remoteMedia.current;
            attachParticipantTracks(participant, previewContainer);
        });
        //Participant joining room
        room.on('participantConnected', participant => {
            console.log("Joining: '" + participant.identity + "'");
        });

        // Attach participant’s tracks to DOM when they add a track
        room.on('trackAdded', (track, participant) => {
            console.log(participant.identity + ' added track: ' + track.kind);
            var previewContainer = remoteMedia.current;
            attachTracks([track], previewContainer);
        });

        // Detach participant’s track from DOM when they remove a track.
        room.on('trackRemoved', (track, participant) => {
            this.log(participant.identity + ' removed track: ' + track.kind);
            this.detachTracks([track]);
        });

        // Detach all participant’s track when they leave a room.
        room.on('participantDisconnected', participant => {
            console.log("Participant '" + participant.identity + "' left the room");
            this.detachParticipantTracks(participant);
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
        var tracks = Array.from(participant.tracks.values());

        attachTracks(tracks, container);
    };

    const attachTracks = (tracks, container) => {
        tracks.forEach(track => {
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
        dispatch(getAccessToken()).then(res => {
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
                    </div>
                </div>

                <div className='row'> {joinOrLeaveRoomButton}</div>
                <div className='row'>
                    <div className='col-sm-6'>{showLocalTrack}</div>
                    <div className='col-sm-6'>
                        <div className='flex-item' id='remote-media' ref={remoteMedia} />
                        remotemedia
                    </div>
                </div>
            </div>
        </>
    );
};
export default VideoChat;
