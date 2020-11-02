import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../../../redux/auth/actions';
import ThePublicHeader from '~/containers/PublicLayouts/PublicHeader';
import { useForm } from 'react-hook-form';
const ResetPassword = props => {
    const { register, handleSubmit, errors } = useForm({
        mode: 'onChange'
    });

    const [passwordShown, setPasswordShown] = useState(false);

    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
    const [passwordMatched, setPasswordMatched] = useState(true);
    const dispatch = useDispatch();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    const togglePasswordVisiblity1 = () => {
        setConfirmPasswordShown(confirmPasswordShown ? false : true);
    };
    const submitPassword = formData => {
        const password = formData.password;
        const confirmPassword = formData.confirmPassword;

        if (password !== confirmPassword) {
            setPasswordMatched(false);
        } else {
            let data = {
                token: urlParams.get('token'),
                password: password
            };

            dispatch(resetPassword(data))
                .then(res => {
                    alert(res.data.message, 'res');
                })
                .catch(err => console.log(err, 'err'));
            setPasswordMatched(true);
        }
    };

    return (
        <section className='free-sign-up h-100 w-100'>
            <ThePublicHeader />
            <div className='container h-100'>
                <div className='row h-100 justify-content-center align-items-center'>
                    <div className='col-md-4 col-sm-12 p-4 forgotpass m-1 bg-white text-center'>
                        <div className='main-title pt-4 pb-3'>
                            <h1 className='mb-3'>Change Password</h1>
                        </div>
                        <form className='mb-0 text-left' onSubmit={handleSubmit(submitPassword)}>
                            <div className='form-group password-input'>
                                <label>New Password</label>
                                <input
                                    type={passwordShown ? 'text' : 'password'}
                                    id='passInput'
                                    className='form-control'
                                    id='exampleInputPassword1'
                                    placeholder='Password'
                                    name='password'
                                    ref={register({ required: true })}
                                />
                                {errors.password && (
                                    <p className='customErrors text-danger mt-2'>Please enter password</p>
                                )}
                                <span
                                    toggle='#input-pwd'
                                    className='fa fa-fw fa-eye field-icon toggle-password'
                                    onClick={togglePasswordVisiblity}></span>
                            </div>
                            <div className='form-group password-input mb-3'>
                                <label>Confirm New Password</label>
                                <input
                                    type={confirmPasswordShown ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder='Password'
                                    name='confirmPassword'
                                    ref={register({ required: true })}
                                />
                                {errors.confirmPassword && (
                                    <p className='customErrors text-danger mt-2'>Please enter confirm password</p>
                                )}
                                <span
                                    toggle='#input-pwd'
                                    className='fa fa-fw fa-eye field-icon toggle-password'
                                    onClick={togglePasswordVisiblity1}></span>
                            </div>
                            {passwordMatched == false ? (
                                <span className='medium-size text-left' style={{ color: '#ff2828' }}>
                                    New Password and Confirm Password do not match
                                </span>
                            ) : (
                                ''
                            )}

                            <button type='submit' className='btn btn-primary w-100 medium-size mb-3 mt-2'>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default ResetPassword;
