import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { loginUser } from '~/redux/auth/actions';
import ThePublicHeader from '~/containers/PublicLayouts/PublicHeader';
const Login = props => {
    const { history } = props;
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const { loading } = auth;
    /**
     * * @useForm hooks
     */
    const { register, handleSubmit, errors, watch, formState } = useForm({
        mode: 'onChange'
    });
    /**
     *
     * @param value
     */
    const login = value => {
        dispatch(loginUser(value.email, value.password, history));
    };
    return (
        <>
            <ThePublicHeader />
            <section className='free-sign-up mt-5'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-md-6 col-12  col-xl-4'>
                            <div className='main-title pt-3 pb-4'>
                                <h2 className='widget-title mb-3'>Sign in</h2>
                                <p>Please enter email and password to login</p>
                            </div>
                            <form className='mb-4' onSubmit={handleSubmit(login)} autoComplete='off'>
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
                                <div className='form-group password-input'>
                                    <label htmlFor='exampleInputPassword1'>Password</label>
                                    <input
                                        type='password'
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
                                </div>
                                <button type='submit' className='btn btn-primary w-100'>
                                    {loading ? 'Signing in...' : 'Sign In'}
                                </button>
                                {/*<Dimmer active={loading} inverted><Loader active={loading} className={'lcolor'}/></Dimmer>*/}
                            </form>
                            <div className='text-center'>
                                <a href='/forget-password' className='text-dark'>
                                    Forget your password?
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Login;
