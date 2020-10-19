import React, { useState, useEffect, useRef } from 'react';
import { getAccessToken } from '../../../../../redux/rooms/action';
import { setAccessToken } from '../../../../../redux/rooms/action';
import { useDispatch, useSelector } from 'react-redux';
import { GET_TOKEN_SUCCESS } from '../../../../../redux/rooms/type';
import CryptoJS from 'crypto-js';
const { connect, createLocalTracks, createLocalVideoTrack, isSupported } = require('twilio-video');
const VideoChat = props => {
    const localMedia = useRef(null);
    const remoteMedia = useRef(null);
    const dispatch = useDispatch();
    const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
    const [activeRoom, setActiveRoom] = useState(null);

    const twilioToken = useSelector(state => state.rooms.token);

    const urlData = props.match.params.identity;
    // const leaveRoom = props => {
    //     activeRoom.on('disconnected', room => {
    //         // Detach the local media elements
    //         activeRoom.localParticipant.tracks.forEach(publication => {
    //             publication.track.stop();
    //             const attachedElements = publication.track.detach();
    //             attachedElements.forEach(element => element.stop());
    //             console.log('removing local media');
    //         });
    //     });
    //     activeRoom.disconnect();
    //     //        setToken(null);
    //     setHasJoinedRoom(false);
    // };

    const joinRoom = roomName => {
        console.log("Joining room '" + roomName + "'...");

        if (isSupported) {
            createLocalTracks({
                audio: true,
                video: true
            })
                .then(localTracks => {
                    return connect(
                        twilioToken,
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

    const startVideo = () => {
        console.log('params', props.match.params.identity);
        if (twilioToken == null) {
            console.log('urldatais', urlData);
            dispatch(getAccessToken(urlData, urlData)).then(res => {
                localStorage.setItem('twilioacesstoken', res.data.data.result.access_token);
                console.log('token in redux', twilioToken);
                dispatch(setAccessToken(res.data.data.result.access_token));
                joinRoom(urlData);
            });
        } else {
            console.log('join to room   ');
            joinRoom(urlData);
        }
    };

    let joinOrLeaveRoomButton = hasJoinedRoom ? (
        <button label='Leave Room' className='btn btn-warning'>
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
                        <button className='btn btn-primary' onClick={startVideo}>
                            getToken
                        </button>
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
