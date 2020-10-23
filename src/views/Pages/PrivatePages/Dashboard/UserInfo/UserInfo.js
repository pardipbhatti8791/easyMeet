import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import defaultImg from '../../../../../assets/images/defaultProfile.png';
import { updateUserBio } from '~/redux/boarding/action';
import Modal from 'react-bootstrap/Modal';
import { updateAvailability } from '~/redux/boarding/action';
import { checkAvailability } from '~/redux/boarding/action';
import { closeModal, openModal } from '../../../../../redux/global_modal/actions';
import noPhoto from '~/assets/images/photo.png';
import { copyToClipBoard } from '../../../../../utils/copyToCilpBoard';

function UserInfo() {
    const dispatch = useDispatch();

    const [openBioPopUp, setOpenBioPopUp] = useState(false);
    const [loader, setLoader] = useState(false);
    const [editBio, setEditBio] = useState({ value: '' });

    const userInfo = useSelector(state => state.auth.user);
    const {
        availibility: { meeter_availibility, available_for }
    } = userInfo;

    useEffect(() => {
        dispatch(checkAvailability(userInfo.id));
        setEditBio({ value: userInfo.meeter_bio });
    }, []);

    if (userInfo !== null) {
    }

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
    const addDefaultSrc = () => {
        e.target.src = defaultImg;
    };
    return (
        <>
            <section className='personal-details bg-white pb-4'>
                <div className='container'>
                    <div className='row'>
                        <div className='media text-left'>
                            <div className='align-self-center text-center mr-3 default-opacity avatar-container'>
                                <img
                                    id='openDrag'
                                    className='mb-1'
                                    src={userInfo.meeter_image_slug === '' ? noPhoto : userInfo.meeter_image_slug}
                                    alt='photo'
                                    onError={addDefaultSrc}
                                    onClick={() => dispatch(openModal('AvatarModal', { open: true }))}
                                />
                            </div>
                            <div className='media-body align-self-center'>
                                <h2 className='mt-0'> {userInfo.meeter_fullname}</h2>
                                <a className='edit-bio small-size opacity-6' onClick={() => setOpenBioPopUp(true)}>
                                    Click to edit your bio <i className='fa fa-pencil' aria-hidden='true'></i>
                                </a>
                                <p style={{ pointer: 'cursor' }} className='edit-bio small-size' href='#'>
                                    {userInfo.meeter_bio}
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
                                    className='url-room small-size'
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => copyToClipBoard('easymeet.io/meet/' + userInfo.meeter_meet_slug)}>
                                    easymeet.io/meet/{userInfo.meeter_meet_slug}{' '}
                                    <i
                                        onClick={() => copyToClipBoard('easymeet.io/meet/' + userInfo.meeter_meet_slug)}
                                        className='fa fa-clone'
                                        aria-hidden='true'
                                    />
                                </span>
                            </div>
                        </div>
                        <div className='avilability ml-auto text-right'>
                            <span className='small-size'>My Availability:</span>
                            <div className='align-self-center row d-flex mx-0 my-2'>
                                <div className='meeting-room align-self-center mr-3'>
                                    <button
                                        className='btn btn-default meeting-btn bg-white small-size'
                                        onClick={() => {
                                            // window.location.href = '/video-chat';
                                        }}>
                                        <i className='fa fa-camera' aria-hidden='true' /> Meeting Room
                                    </button>
                                </div>
                                <div className='button b2 available_btnWrapper' id='button-10'>
                                    <RadioGroup value={meeter_availibility} onChange={onChange} horizontal>
                                        <RadioButton value='yes' className='radiobtn'>
                                            Available
                                        </RadioButton>
                                        <RadioButton value='no'>Not Available</RadioButton>
                                    </RadioGroup>
                                </div>
                            </div>
                            <span className='small-size extend'>
                                {loader ? (
                                    'Updating...'
                                ) : meeter_availibility === 'yes' ? (
                                    <>
                                        Available for <span>{available_for && available_for.hours}</span> hours{' '}
                                        <span>{available_for && available_for.minutes}</span> minutes. available_for
                                        <a href='#'>Extend ⯆</a>
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
