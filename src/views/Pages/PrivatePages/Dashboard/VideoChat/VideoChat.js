import React, { useState, useEffect, useRef } from 'react';
import {
    setAccessToken,
    twilioLogout,
    getAccessToken,
    meetingStatus,
    getMeetingRoomStatus
} from '../../../../../redux/rooms/action';
import { useDispatch, useSelector } from 'react-redux';
import Room from './Room';
import Footer from './Footer';

const { connect, createLocalTracks, createLocalVideoTrack, isSupported } = require('twilio-video');
const VideoChat = props => {
    const dispatch = useDispatch();
    const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
    const [activeRoom, setActiveRoom] = useState(null);
    const userInfo = useSelector(state => state.auth.user);
    const twilioToken = useSelector(state => state.rooms.token);
    const userIdentity = userInfo.meeter_email;
    const userId = userInfo.id;
    const roomName = props.match.params.roomName;

    const joinRoom = (roomName, accessToken) => {
        console.log("Joining room '" + roomName + "'...");
        const tokenToBeSend = twilioToken == null ? accessToken : twilioToken;
        if (isSupported) {
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

        dispatch(meetingStatus(data)).then(res => {});
        setActiveRoom(room);
        setHasJoinedRoom(true);

        // Log your Client's LocalParticipant in the Room
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
        } else {
            console.log('join to room   ');
            joinRoom(roomName);
        }
    };

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
            </div>
            {hasJoinedRoom ? <Room room={activeRoom} /> : ''}
            {hasJoinedRoom ? <Footer room={activeRoom} setHasJoinedRoom={setHasJoinedRoom} /> : ''}
        </>
    );
};
export default VideoChat;
