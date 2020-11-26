import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../../../redux/auth/actions';
import ThePublicHeader from '~/containers/PublicLayouts/PublicHeader';
import { useForm } from 'react-hook-form';
const ForgetPassword = () => {
    const { register, handleSubmit, errors } = useForm({
        mode: 'onChange'
    });
    const dispatch = useDispatch();
    const onSubmit = formData => {
        const email = formData.email;
        dispatch(forgetPassword(email)).then(res => {
            alert('Reset mail sent');
        });
    };
    return (
        <section className='free-sign-up h-100 w-100'>
            <ThePublicHeader />
            <div className='container h-100'>
                <div className='row h-100 justify-content-center align-items-center'>
                    <div className='col-md-6 col-12 col-xl-4  p-4 forgotpass m-1 bg-white text-center'>
                        <div className='forgotsign'>
                            <div className='m-auto'>!</div>
                        </div>
                        <div className='main-title pt-4 pb-3'>
                            <h1 className='mb-3'>Forgot Password</h1>
                            <p className='medium-size gray6'>
                                Enter your Email and we'll send you a link to reset your password
                            </p>
                        </div>
                        <form className='mb-0 text-left' onSubmit={handleSubmit(onSubmit)}>
                            <div className='form-group mb-2'>
                                <input
                                    type='email'
                                    className='form-control'
                                    id='exampleInputEmail1'
                                    name='email'
                                    placeholder='Email address'
                                    aria-describedby='emailHelp'
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
                                {errors.email && (
                                    <p className='customErrors text-danger mt-2'>{errors.email.message}</p>
                                )}
                            </div>
                            <span className='medium-size text-left' style={{ color: '#FF2828' }}></span>
                            <button type='submit' className='btn btn-primary w-100 medium-size mb-3 mt-2'>
                                Submit
                            </button>
                        </form>
                        <a className='small-size' href='/login'>
                            {' '}
                            <i className='fa fa-chevron-left mr-2' aria-hidden='true'></i> Back to Login
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default ForgetPassword;
