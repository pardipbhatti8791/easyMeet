import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


const stepTwo = (props) => {
    const { history } = props;
    /**
     * Handle Submit
     */
    const handleSubmit = () => { 
        history.push('/onboarding-three');
    };
    return (
        <>

            <section className='free-sign-up mt-5'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-6 px-2'>
                            <div className='main-title pt-3 pb-2 px-3'>
                                <h1 className='pb-2'>Welcome to EasyMeet</h1>
                                <p className='medium-size'>Let’s start with a quick and simple onboarding before you can start doing
                no-hassle meetings.</p>
                            </div>
                            <div id="step-2" className='steps-line mb-4'>
                                <span style={{ color: '#9f9f9f' }}><span>2</span> of 3</span>
                                <div className='row mx-0 step-container mt-2'>
                                    <span className='col-4 step-active remove-step-space-1'></span>
                                    <span className='col-4 step-active remove-step-space-2'></span>
                                    <span className='col-4'></span>
                                </div>
                            </div>
                            <div className='createURL text-left mb-4'>
                                <h3 className='mb-3 medium-size'>Allow EasyMeet to send you browser notifications</h3>
                                <p>Click “Allow” on the popup message appeared on top of your browser in order to receive the best EasyMeet experience. </p>
                            </div>
                            <div className='notification-img text-left mb-4'>
                                <img src='/assets/images/notification.png' alt='notification' />
                            </div>
                            <div className='set-up-later row'>
                                <div className='col-4 pt-3 text-left' style={{ fontSize: '.85rem', opacity: '0.6' }}>
                                    Set up later
                                </div>
                                <div className='col-8 text-right'>
                                    <button
                                        type='submit'
                                        className='btn btn-primary' 
                                        onClick={handleSubmit}>
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default stepTwo;
