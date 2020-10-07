import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const stepThree = () => {
    const user = useSelector(state => state.auth);
    const { user: { meeter_meet_slug } } = user;

    const [meetSlug, setMeetSlug] = useState(meeter_meet_slug !== null ? meeter_meet_slug : '');
    console.log(localStorage.getItem('meeter_slug'));

    return (
        <>

            <section className="free-sign-up mt-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-6 px-2">
                            <div className="main-title pt-3 pb-2 px-3">
                                <h1 className="pb-2">Welcome to EasyMeet</h1>
                                <p className="medium-size">Let’s start with a quick and simple onboarding before you can
                                    start doing
                                    no-hassle meetings.</p>
                            </div>
                            <div className="steps-line mb-4">
                                <span style={{ color: '#9f9f9f' }}><span>3</span> of 3</span>
                                <div className="row mx-0 step-container mt-2">
                                    <span className="col-4 step-active remove-step-space-1"></span>
                                    <span className="col-4 step-active" style={{ borderRadius: 0 }}></span>
                                    <span className="col-4 step-active remove-step-space-2"></span>
                                </div>
                            </div>
                            <div className="createURL text-left mb-3">
                                <h3 className="mb-3 medium-size">Your account is ready. Share it</h3>
                                <p>Here is your sharable link. If you want, you can change it from your dashboard at any
                                    time.</p>
                            </div>
                            <div className="createdURL text-center mb-2">
                                easymeet.io/{meetSlug}
                            </div>
                            <div className="row icons mb-4">
                                <div className="col mx-2 px-0"><a className="px-1 py-2" href="#"><img className="pr-1"
                                                                                                      src="assets/images/Copy.png"
                                                                                                      alt="Copy"/>
                                    <span>Copy</span> </a></div>
                                <div className="col mx-2 px-0"><a className="px-1 py-2" href="#"><img className="pr-1"
                                                                                                      src="assets/images/facebook.png"
                                                                                                      alt="Facebook"/><span>Facebook</span>
                                </a></div>
                                <div className="col mx-2 px-0"><a className="px-1 py-2" href="#"><img className="pr-1"
                                                                                                      src="assets/images/twitter.png"
                                                                                                      alt="Twitter"/>
                                    <span>Twitter</span> </a></div>
                                <div className="col mx-2 px-0"><a className="px-1 py-2" href="#"><img className="pr-1"
                                                                                                      src="assets/images/linkedin.png"
                                                                                                      alt="LinkedIn"/>
                                    <span>LinkedIn</span> </a></div>
                                <div className="col mx-2 px-0"><a className="px-1 py-2" href="#"><img className="pr-1"
                                                                                                      src="assets/images/Envelope.png"
                                                                                                      alt="Email"/>
                                    <span>Email</span> </a></div>
                            </div>
                            <div className="set-up-later w-100">
                                <div className="text-center">
                                    <Link to={'/'} type="submit" className="btn btn-primary">To My Account</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default stepThree;
