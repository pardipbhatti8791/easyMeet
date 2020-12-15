import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ThePublicHeader from '~/containers/PublicLayouts/PublicHeader';
import { getMeeterData, meetingRequest } from '../../../../redux/meetings/action';

import defaultImg from '../../../../assets/images/EasyMeetBig.svg';
import RenderComponent from '../../../../utils/renderComponent';
import MeeterDetails from './children/MeeterDetails';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function MeetingLink(props) {
    const [phoneNumber, setPhoneNumber] = useState('');

    const dispatch = useDispatch();
    const {
        match: { params }
    } = props;
    const meeting = useSelector(state => state.meeting);
    const { meeter_spinner, meeter_data } = meeting;

    useEffect(() => {
        dispatch(getMeeterData(params.slug));
        return {};
    }, []);

    /**
     * @params { register, handleSubmit }
     */
    const { register, handleSubmit } = useForm({
        mode: 'onChange'
    });

    /**
     *
     * @param formData
     */
    const handleRegister = formData => {
        const { history } = props;
        const data = {
            meeter_id: meeter_data.id,
            requester_name: formData.full_name,
            requester_email: formData.email,
            requester_phone: phoneNumber,
            summary: formData.summary,
            device_token: 'dasdkfjasdkf'
        };
        dispatch(meetingRequest(data, history)).then(res => {
            window.location.href = '/request-send-sucess';
        });
    };
    const addDefaultSrc = e => {
        e.target.src = defaultImg;
    };
    return (
        <>
            <ThePublicHeader />
            <div className='meeterProfile'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='personal-details py-5 boxShadowNon'>
                                <div className='MeeterBrandContainer pb-4 mob-meter-brand-logo'>
                                    <a className='navbar-brand m-0 px-0 pt-0 pb-2 d-block' href='/sign-up'>
                                        <img src='/assets/images/EasyMeetBig.svg' alt='logo' onError={addDefaultSrc} />
                                    </a>
                                    <span className='Brandtext opacity-8'>Never schedule a meeting again.</span>
                                </div>
                                <RenderComponent
                                    component={MeeterDetails}
                                    spinner={meeter_spinner}
                                    data={meeter_data}
                                />
                            </div>
                        </div>
                        <div className='col-md-6 bg-white'>
                            <div className='meeterProfileSignUp text-left'>
                                <div className='MeeterBrandContainer pb-4 mob-hide'>
                                    <a className='navbar-brand m-0 px-0 pt-0 pb-2 d-block' href='/sign-up'>
                                        <img src='/assets/images/EasyMeetBig.svg' alt='logo' onError={addDefaultSrc} />
                                    </a>
                                    <span className='Brandtext opacity-8'>Never schedule a meeting again.</span>
                                </div>
                                <div className='MeeterLine mob-hide'></div>
                                <div className='MeeterDetails'>
                                    <h3 className='mb-3'>Some details before you meet:</h3>
                                    <form className='mb-4' onSubmit={handleSubmit(handleRegister)} autoComplete='off'>
                                        <div className='form-group'>
                                            <label htmlFor='full_name'>Your name</label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                name='full_name'
                                                placeholder='Enter your name'
                                                required
                                                ref={register({
                                                    required: {
                                                        value: true,
                                                        message: 'Please enter your name'
                                                    },
                                                    pattern: {
                                                        value: /(^[a-z?A-Z]{0,})([-']?[a-zA-Z]+)+( [a-zA-Z]([-']?[a-zA-Z]+)*)?$/,
                                                        message:
                                                            'Please enter valid name. Do not use numeric, special and double space.'
                                                    },
                                                    minLength: {
                                                        value: 1,
                                                        message: 'Name must have at least 1 characters'
                                                    },
                                                    maxLength: {
                                                        value: 255,
                                                        message: 'Name max length 255 characters'
                                                    }
                                                })}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='email'>Your email</label>
                                            <input
                                                type='email'
                                                className='form-control'
                                                name='email'
                                                placeholder='Enter your email address'
                                                aria-describedby='emailHelp'
                                                required
                                                ref={register({
                                                    required: {
                                                        value: true,
                                                        message: 'Please enter your email'
                                                    },
                                                    pattern: {
                                                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                                        message: 'Please enter your valid email '
                                                    },
                                                    minLength: {
                                                        value: 2,
                                                        message: 'Email must have at least 2 characters '
                                                    },
                                                    maxLength: {
                                                        value: 320,
                                                        message: 'Email max length 320 characters '
                                                    }
                                                })}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='meeter_phone'></label>
                                            <PhoneInput
                                                country={'us'}
                                                inputProps={{
                                                    name: 'phone',
                                                    required: true
                                                }}
                                                inputStyle={{
                                                    display: 'block',
                                                    width: '100%',
                                                    lineHeight: 1.5,
                                                    color: '#495057',
                                                    backgroundColor: '#fff',
                                                    backgroundClip: 'padding-box',
                                                    border: '1px solid #ced4da',
                                                    borderRadius: '.25rem',
                                                    padding: '0.7rem 0.75rem',
                                                    borderColor: '#eeeeee',
                                                    fontSize: '0.86rem',
                                                    minHeight: '41px',
                                                    paddingLeft: '50px'
                                                }}
                                                onChange={phone => setPhoneNumber(phone)}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='summary'>Meeting summary</label>
                                            <textarea
                                                className='form-control'
                                                name='summary'
                                                placeholder='What are you going to discuss?'
                                                rows='6'
                                                ref={register({
                                                    required: {
                                                        value: true,
                                                        message: 'Please answer What are you going to discuss?'
                                                    },
                                                    minLength: {
                                                        value: 1,
                                                        message: 'Answer must have at least 1 characters'
                                                    }
                                                })}></textarea>
                                        </div>
                                        <button type='submit' className='btn btn-primary w-100'>
                                            Request a meeting
                                        </button>
                                    </form>
                                </div>
                                <div className='meeterProfileMsg custom-meeterProfileMsg px-2 py-3 text-center'>
                                    <h2 className='opacity-8'>
                                        Use EasyMeet <br />
                                        to host meetings yourself!
                                    </h2>
                                    <p className='opacity-6 mb-0'>Not having to schedule meetings is a superpower</p>

                                    <button
                                        type='button'
                                        className='btn btn-primary medium-size'
                                        onClick={() => (window.location.href = '/sign-up')}>
                                        Sign up as a host
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MeetingLink;
