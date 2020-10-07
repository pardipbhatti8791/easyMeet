import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkSlugAvailability } from '~/redux/boarding/action';
import { updateSlug } from '~/redux/boarding/action';
import { loadUser } from '~/redux/auth/actions';
import { errorAlert } from '../../../../utils/sweetAlert';

function StepOne(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);
    const {
        user: { meeter_meet_slug }
    } = user;
    const { history } = props;

    const [meetSlug, setMeetSlug] = useState(meeter_meet_slug !== null ? meeter_meet_slug : '');
    const [error, setError] = useState(null);
    const [typingTimeout, setTypingTimeout] = useState(true);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const body = document.body;
        body.classList.add('onboarding');
    }, []);

    /**
     * Handle Submit
     */
    const handleSubmit = () => {
        if (meeter_meet_slug === meetSlug) {
            history.push('/onboarding-two');
        } else {
            const data = {
                meeter_slug: meetSlug
            };
            if (error == null) {
                dispatch(updateSlug(data))
                    .then(res => {
                        if (res.status == '203') {
                            setError('This Meeter Slug already exists.');
                        } else {
                            setError(null);
                            dispatch(loadUser());
                            localStorage.removeItem('meeter_slug');
                            localStorage.setItem('meeter_slug', meetSlug);
                            history.push('/dashboard');
                        }
                    })
                    .catch(err => console.log(err));
            }
        }
    };

    const checkAvail = evt => {
        setLoader(true);
        var value = evt.target.value;

        setMeetSlug(value);
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        setTypingTimeout(
            setTimeout(() => {
                dispatch(checkSlugAvailability(value))
                    .then(res => {
                        setLoader(false);
                        setError(null);
                    })
                    .catch(err => {
                        setError('This Meeter Slug already exists.');
                        setLoader(false);
                        console.log(err.response.data.errors);
                        errorAlert(err.response.data.errors);
                    });
            }, 2000)
        );
    };

    return (
        <>
            <section className='free-sign-up mt-5'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-6 px-2'>
                            <div className='main-title pt-3 pb-2 px-3'>
                                <h1 className='pb-2'>Welcome to EasyMeet</h1>
                                <p>
                                    Let’s start with a quick and simple onboarding before you can start doing no-hassle
                                    meetings.
                                </p>
                            </div>
                            <div className='steps-line mb-4'>
                                <span style={{ color: '#9f9f9f' }}>
                                    <span>1</span> of 3
                                </span>
                                <div className='row mx-0 step-container mt-2'>
                                    <span className='col-4 step-active'></span>
                                    <span className='col-4'></span>
                                    <span className='col-4'></span>
                                </div>
                            </div>
                            <div className='createURL text-left'>
                                <h3 className='mb-3'>Create your EasyMeet URL</h3>
                                <p>
                                    Choose a URL that describes you or your business in a concice way. Make it short and
                                    easy to remember so you can share links with ease. You can change it later any time.
                                </p>
                            </div>
                            <div className='input-group input-group-sm url-input mb-4'>
                                <div className='input-group-prepend'>
                                    <span className='input-group-text'>easymeet.io/</span>
                                </div>
                                <input
                                    type='url'
                                    id='url'
                                    className='form-control fix-rounded-right'
                                    placeholder='johndoe-2'
                                    required
                                    value={meetSlug}
                                    onChange={e => checkAvail(e)}
                                />
                            </div>
                            <div className='set-up-later row'>
                                <div className='col-4 pt-3 text-left' style={{ fontSize: '.85rem', opacity: '0.6' }}>
                                    Set up later
                                </div>
                                <div className='col-8 text-right'>
                                    <button
                                        type='submit'
                                        className='btn btn-primary'
                                        disabled={loader}
                                        onClick={handleSubmit}>
                                        {loader ? 'Checking slug' : 'Continue'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default StepOne;
