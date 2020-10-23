import React, { useRef, useState } from 'react';

const { createLocalVideoTrack } = require('twilio-video');

const Room = props => {
    const localMedia = useRef(null);
    const remoteMedia = useRef(null);
    const room = props.room;
    let isRemote = false;
    const localParticipant = room.localParticipant;
    console.log(`Connected to the Room as LocalParticipant "${localParticipant.identity}"`);

    // Log any Participants already connected to the Room
    room.participants.forEach(participant => {
        console.log(`Participant "${participant.identity}" is connected to the Room`);
        isRemote = true;
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
        //seIsRemote(true);
        participant.tracks.forEach(publication => {
            if (publication.isSubscribed) {
                const track = publication.track;
                remoteMedia.current.appendChild(track.attach());
            }
        });

        participant.on('trackSubscribed', track => {
            isRemote = true;
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
            console.log('attaching local media', track);
            localMedia.current.appendChild(track.attach());
        })
        .then(err => {
            console.log(err);
        });
    console.log('isremote value is', isRemote);
    return (
        <>
            <div className='bgdark withSideBar meetRoom waitingHost'>
                <div className='host text-right  d-none d-lg-block videodiv' ref={localMedia}></div>
                <div className='container mainRoom'>
                    <div className='row justify-content-center align-items-center h-100'>
                        <div>
                            <div
                                className='media mainRoomMedia personal-details media-body text-center d-block mb-4 remotevideodiv'
                                ref={remoteMedia}></div>

                            {/* {!isRemote ? (
                                <div className='media mainRoomMedia personal-details media-body text-center d-block mb-4'>
                                    <div className='text-center default-opacity m-auto avatar-container'></div>
                                    <h2 className='font36 mt-4 mb-2 mb-0'>Waiting for the host.</h2>
                                    <p className='edit-bio medium-size gray8' href='#'>
                                        Host is available and must join the room soon
                                    </p>
                                </div>
                            ) : (
                                ''
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Room;
