import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ThePublicHeader from '~/containers/PublicLayouts/PublicHeader';
import { getMeeterData, meetingRequest } from '../../../../redux/meetings/action';

import RenderComponent from '../../../../utils/renderComponent';
import MeeterDetails from './children/MeeterDetails';

function MeetingLink(props) {
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
            summary: formData.summary,
            device_token: 'dasdkfjasdkf'
        };
        dispatch(meetingRequest(data, history));
    };
    return (
        <>
            <ThePublicHeader />

            <div className='meeterProfile'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 pl-0'>
                            <div className='personal-details py-5 boxShadowNon'>
                                <RenderComponent component={MeeterDetails} spinner={meeter_spinner} data={meeter_data} />
                            </div>
                        </div>
                        <div className='col-6 bg-white'>
                            <div className='meeterProfileSignUp text-left'>
                                <div className='MeeterBrandContainer pb-4'>
                                    <a className='navbar-brand m-0 px-0 pt-0 pb-2 d-block' href='index.html'>
                                        <img src='/assets/images/EasyMeetBig.svg' alt='logo' />
                                    </a>
                                    <span className='Brandtext opacity-8'>Never schedule a meeting again.</span>
                                </div>
                                <div className='MeeterLine'></div>
                                <div className='MeeterDetails pr-3'>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MeetingLink;
