import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { signUpRequest } from '~/redux/auth/actions';
import { ThePublicHeader } from '~/containers/index';
const SignUp = props => {
    /**
     * * @useForm hooks
     */
    const { register, handleSubmit, errors } = useForm({
        mode: 'onChange'
    });
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const { loading, isAuthenticated } = auth;
    const [passwordVisible, setPasswordVisible] = useState('password');
    const [phoneNumber, setPhoneNumber] = useState('');
    if (isAuthenticated) {
        return <Redirect to='/onBoarding-one' />;
    }
    /*
     * Toggle Password Visibility
     *
     */
    const togglePasswordVisibility = e => {
        passwordVisible === 'password' ? setPasswordVisible('text') : setPasswordVisible('password');
    };
    /**
     *
     * @param {*} formData
     */
    const handleRegister = formData => {
        const { history } = props;
        const data = {
            meeter_fullname: formData.full_name,
            meeter_email: formData.email,
            meeter_password: formData.password,
            meeter_phone: `+${phoneNumber}`,
            device_token: 'dasdkfjasdkf'
        };
        // console.log(data);
        dispatch(signUpRequest(data, history));
    };
    return (
        <>
            <ThePublicHeader />
            <section className='free-sign-up mt-5'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-md-6 col-12  col-xl-4'>
                            <div className='main-title pt-3 pb-4'>
                                <h1>Sign up for free</h1>
                            </div>
                            <form className='mb-4' onSubmit={handleSubmit(handleRegister)} autoComplete='off'>
                                <div className='form-group'>
                                    <label htmlFor='exampleInputEmail1'>Email address</label>
                                    <input
                                        type='email'
                                        className='form-control'
                                        id='exampleInputEmail1'
                                        placeholder='Email address'
                                        aria-describedby='emailHelp'
                                        name='email'
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
                                <div className='form-group'>
                                    <label htmlFor='exampleInputName'>Full name</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        id='exampleInputName'
                                        placeholder='Full name'
                                        name='full_name'
                                        ref={register({
                                            required: {
                                                value: true,
                                                message: 'Please enter your full name'
                                            },
                                            pattern: {
                                                value: /(^[a-z?A-Z]{0,})([-']?[a-zA-Z]+)+( [a-zA-Z]([-']?[a-zA-Z]+)*)?$/,
                                                message:
                                                    'Please enter valid full name. Do not use numeric, special and double space.'
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
                                    {errors.full_name && (
                                        <p className='customErrors text-danger mt-2'>{errors.full_name.message}</p>
                                    )}
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='meeter_phone'>Phone</label>
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
                                            border: '1px solid #CED4DA',
                                            borderRadius: '.25rem',
                                            padding: '0.7rem 0.75rem',
                                            borderColor: '#EEEEEE',
                                            fontSize: '0.86rem',
                                            minHeight: '41px',
                                            paddingLeft: '50px'
                                        }}
                                        onChange={phone => setPhoneNumber(phone)}
                                    />
                                </div>
                                <div className='form-group '>
                                    <label htmlFor='exampleInputPassword1'>Password</label>
                                    <div class='password-input'>
                                        <input
                                            type='password'
                                            id='passInput'
                                            className={errors.password ? 'form-control mt-2' : 'form-control'}
                                            className='form-control'
                                            id='exampleInputPassword1'
                                            placeholder='Password'
                                            name='password'
                                            type={passwordVisible}
                                            ref={register({
                                                required: {
                                                    value: true,
                                                    message: 'You must specify a password'
                                                },
                                                minLength: {
                                                    value: 8,
                                                    message: 'Password must have at least 8 characters'
                                                },
                                                maxLength: {
                                                    value: 32,
                                                    message: 'Password max length 32 characters'
                                                }
                                            })}
                                        />
                                        <span
                                            toggle='#input-pwd'
                                            onClick={togglePasswordVisibility}
                                            className={
                                                passwordVisible === 'password' ? 'fa fa-eye-slash' : 'fa fa-eye'
                                            }></span>
                                        {errors.password && (
                                            <p className='customErrors text-danger'>{errors.password.message}</p>
                                        )}
                                    </div>
                                </div>
                                <button type='submit' className='btn btn-primary w-100'>
                                    {loading ? 'Signing up...' : 'Continue'}
                                </button>
                            </form>
                            <span className='have-account'>
                                I already have the account. <Link to={'/login'}>Log in</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default SignUp;
