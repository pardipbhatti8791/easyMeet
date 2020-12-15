import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import { updateUserBio } from '~/redux/boarding/action';
import Modal from 'react-bootstrap/Modal';
import { updateAvailability } from '~/redux/boarding/action';
import { checkAvailability } from '~/redux/boarding/action';
import moment from 'moment';

import { closeModal, openModal } from '../../../../../redux/global_modal/actions';

import md5 from 'md5';
import copyImage from '../../../../../assets/images/copyicon.png';
import { copyToClipBoard } from '../../../../../utils/copyToCilpBoard';

function UserInfo() {
    const dispatch = useDispatch();

    const [openBioPopUp, setOpenBioPopUp] = useState(false);
    const [loader, setLoader] = useState(false);
    const [editBio, setEditBio] = useState({ value: '' });
    const [showMore, setShowMore] = useState(true);
    const [time, setTime] = useState(null);
    const date1 = moment().format();
    console.log('date 1 is', date1);
    let meetingRoomDisabled = true;

    const room = useSelector(state => state.rooms.room);
    if (room != null) {
        meetingRoomDisabled = false;
    }

    const userInfo = useSelector(state => state.auth.user);
    const {
        availibility: { meeter_availibility, available_for }
    } = userInfo;
    //const date2 = userInfo.availibility.time_availibity_till;
    const date2 = moment(userInfo.availibility.time_availibity_till);
    console.log('date from api is', userInfo.availibility.time_availibity_till);
    console.log('date 2 is', date2);
    const date3 = new Date();
    console.log('date with new Date is', date3.getMonth() + 1, '-', date3.getFullYear());

    console.log('playing with moment', moment().format());

    let gravatarImage = md5(userInfo.meeter_email.toLowerCase().trim());
    useEffect(() => {
        dispatch(checkAvailability(userInfo.id));
        setEditBio({ value: userInfo.meeter_bio });
    }, []);

    // setInterval(() => {
    //     //console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
    //     setTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
    // }, 1000);

    const updateBio = () => {
        const data = {
            meeter_bio: editBio.value
        };
        dispatch(updateUserBio(data));
        setOpenBioPopUp(false);
    };
    const handleBioChange = event => {
        setEditBio({ value: event.target.value });
    };

    const onChange = value => {
        if (value === 'no') {
            dispatch(closeModal());
            setLoader(true);
            const data = {
                meeter_availibility: 'no'
            };
            dispatch(updateAvailability(data)).then(resp => {
                setLoader(false);
            });
        } else {
            dispatch(openModal('MyAvailabilityModal', { open: true }));
        }
    };
    const addDefaultSrc = e => {
        e.target.src = `https://www.gravatar.com/avatar/${gravatarImage}?d=mp`;
    };
    let minorString;
    let majorString = userInfo.meeter_bio;

    if (userInfo.meeter_bio.length > 250) {
        //console.log(userInfo.meeter_bio.substring(0, 500));
        minorString = userInfo.meeter_bio.substring(0, 250);
    }

    const onMeetingClick = () => {
        if (room !== null) {
            window.location.href = `https://easymeet.io/video-chat/${room}`;
        }
    };

    return (
        <>
            {' '}
            <section className='personal-details bg-white pb-4'>
                <div className='container'>
                    <div className='row m-0'>
                        <div className='media text-left personal-profile'>
                            <div className='profile-wrapper'>
                                <figure className='mb-0'>
                                    <img
                                        id='openDrag'
                                        className='mb-1 align-self-center text-center mr-3 default-opacity avatar-container'
                                        src={
                                            userInfo.meeter_image_slug === ''
                                                ? `https://www.gravatar.com/avatar/${gravatarImage}?d=mp`
                                                : userInfo.meeter_image_slug
                                        }
                                        s
                                        alt='photo'
                                        onError={addDefaultSrc}
                                        onClick={() => {
                                            dispatch(openModal('AvatarModal', { open: true }));
                                        }}
                                    />
                                </figure>

                                <div className='meeting-room align-self-center mr-3'>
                                    <button
                                        className='btn btn-default meeting-btn bg-white small-size'
                                        onClick={onMeetingClick}
                                        disabled={meetingRoomDisabled}>
                                        <i className='mr-2 fa fa-camera' aria-hidden='true' />
                                        Join Meeting Room
                                    </button>
                                </div>
                            </div>
                            <div className='media-body align-self-center'>
                                <h2 className='mt-0'> {userInfo.meeter_fullname}</h2>
                                <a className='edit-bio small-size opacity-6' onClick={() => setOpenBioPopUp(true)}>
                                    Click to edit your bio <i className='fa fa-pencil' aria-hidden='true'></i>
                                </a>
                                <p style={{ pointer: 'cursor' }} className='edit-bio small-size' href='#'>
                                    {/* {userInfo.meeter_bio} */}
                                    {showMore && userInfo.meeter_bio.length > 250 ? minorString : majorString}{' '}
                                    {userInfo.meeter_bio.length > 250 ? (
                                        showMore ? (
                                            <a
                                                style={{ cursor: 'pointer' }}
                                                className='url-room small-size'
                                                onClick={() => setShowMore(!showMore)}>
                                                Show more..
                                            </a>
                                        ) : (
                                            <a
                                                style={{ cursor: 'pointer' }}
                                                className='url-room small-size'
                                                onClick={() => setShowMore(!showMore)}>
                                                Show less..
                                            </a>
                                        )
                                    ) : (
                                        ''
                                    )}
                                </p>

                                <Modal
                                    show={openBioPopUp}
                                    onHide={() => setOpenBioPopUp(false)}
                                    dialogClassName='modal-dialog-centered '>
                                    <div className='modal-header'>
                                        <h5 className='modal-title small-size align-self-center'>Update your bio</h5>
                                        <button type='button' className='close' onClick={() => setOpenBioPopUp(false)}>
                                            <span aria-hidden='true'>&times;</span>
                                        </button>
                                    </div>
                                    <div className='MeeterLine mx-0'></div>

                                    <div className='modal-body pb-0'>
                                        <div>
                                            <input
                                                className='form-control small-size'
                                                type='text'
                                                value={editBio.value}
                                                onChange={e => handleBioChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className='modal-footer'>
                                        <button
                                            className='btn discard p-0 m-0 mr-auto medium-size opacity-6'
                                            onClick={() => setOpenBioPopUp(false)}>
                                            Discard
                                        </button>
                                        <button className='btn btn-primary small-size m-0 update' onClick={updateBio}>
                                            Update Bio
                                        </button>
                                    </div>
                                </Modal>
                                <span
                                    className='mb-0 url-room small-size '
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => copyToClipBoard('easymeet.io/meet/' + userInfo.meeter_meet_slug)}>
                                    easymeet.io/meet/{userInfo.meeter_meet_slug}{' '}
                                    <img className='pr-1' src={copyImage} />
                                </span>
                            </div>
                        </div>
                        <div className='avilability ml-auto text-right'>
                            <span className='small-size'>My Availability:</span>
                            <div className='align-self-center row d-flex mx-0 my-2'>
                                <div className='meeting-room align-self-center mr-3'>
                                    <button
                                        className='btn btn-default meeting-btn bg-white small-size'
                                        onClick={onMeetingClick}
                                        disabled={meetingRoomDisabled}>
                                        <i className='fa fa-camera' aria-hidden='true' /> Meeting Room
                                    </button>
                                </div>
                                <div className='button b2 available_btnWrapper' id='button-10'>
                                    <RadioGroup value={meeter_availibility} onChange={onChange} horizontal>
                                        <RadioButton
                                            value='yes'
                                            pointColor='#336600'
                                            className='radiobtn custm-sucess-btn'
                                            style={{ backgroundColor: 'red' }}>
                                            Available
                                        </RadioButton>
                                        <RadioButton value='no' pointColor='#336600'>
                                            Not Available
                                        </RadioButton>
                                    </RadioGroup>
                                </div>
                            </div>
                            <span className='small-size extend'>
                                {loader ? (
                                    'Updating...'
                                ) : meeter_availibility === 'yes' ? (
                                    <>
                                        Available for <span>{available_for && available_for.hours}</span> hours{' '}
                                        <span>{available_for && available_for.minutes}</span> minutes.
                                        {time}
                                        {/* <a href='#'>Extend ⯆</a> */}
                                    </>
                                ) : (
                                    'Not Available'
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default UserInfo;
