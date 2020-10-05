import React, { useState, useEffect } from 'react';
import { getAccessToken } from '../../../../../redux/meetings/action';
import { useDispatch, useSelector } from 'react-redux';
import Video from 'twilio-video';
const VideoChat = () => {
    const dispatch = useDispatch();
    const [identity, setIdentity] = useState(null);
    const [roomName, setRoomName] = useState('');
    const [roomNameErr, setRoomNameErr] = useState(false);
    const [previewTracks, setPreviewTracks] = useState(null);
    const [localMediaAvailable, setLocalMediaAvailable] = useState(false);
    const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
    const [activeRoom, setActiveRoom] = useState(null);
    const [token, setToken] = useState(null);
    const joinRoom = () => {
        if (!roomName.trim()) {
            setRoomName(true);
            return;
        }
        console.log("Joining room '" + roomName + "'...");
        let connectOptions = {
            name: roomName
        };
        if (previewTracks) {
            connectOptions.tracks = previewTracks;
        }
        Video.connect(token, connectOptions).then(roomJoined, error => {
            alert('Could not connect to Twilio: ' + error.message);
        });
    };

    const roomJoined = room => {
        console.log('room joined as', identity);
        setActiveRoom(room), setLocalMediaAvailable(true), setHasJoinedRoom(true);
    };

    useEffect(() => {
        dispatch(getAccessToken()).then(res => {
            setIdentity(res.data.data.result.identity);
            setToken(res.data.data.result.access_token);
            console.log(identity, token);
        });
    }, []);
    let showLocalTrack = localMediaAvailable ? (
        <div className='flex-item'>
            <div />{' '}
        </div>
    ) : (
        ''
    );
    let joinOrLeaveRoomButton = hasJoinedRoom ? (
        <button label='Leave Room' onClick={() => alert('Leave Room')}>
            Leave room
        </button>
    ) : (
        <button label='Join Room' onClick={joinRoom}>
            Join room
        </button>
    );
    return (
        <>
            <div className='card'>
                <div className='card-text'>
                    <div className='flex-container'>
                        {showLocalTrack} {}
                        <div className='flex-item'>
                            {}
                            <input
                                placeholder='Room Name'
                                name='roomName'
                                value={roomName}
                                onChange={() => {
                                    setRoomName(event.target.value);
                                }}
                                errortext={roomNameErr ? 'Room Name is required' : undefined}
                            />
                            <br />
                            {joinOrLeaveRoomButton} {/* Show either ‘Leave Room’ or ‘Join Room’ button */}
                        </div>
                        {/* 
The following div element shows all remote media (other                             participant’s tracks) 
    */}
                        <div className='flex-item' id='remote-media' />
                    </div>
                </div>
            </div>
        </>
    );
};
export default VideoChat;
