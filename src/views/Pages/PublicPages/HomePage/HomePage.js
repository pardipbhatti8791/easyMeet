import React from 'react';
import ThePublicHeader from '~/containers/PublicLayouts/PublicHeader';

import smartmockups from '../../../../assets/images/landingPage/smartmockups.png';
import benefits from '../../../../assets/images/landingPage/benefits.png';
import circle1 from '../../../../assets/images/landingPage/circle1.png';
import circle2 from '../../../../assets/images/landingPage/circle2.png';
import circle3 from '../../../../assets/images/landingPage/circle3.png';
import circle4 from '../../../../assets/images/landingPage/circle4.png';

import howitworks1 from '../../../../assets/images/landingPage/howitworks1.png';
import howitworks111 from '../../../../assets/images/landingPage/howitworks-11-1.png';
import howitworks11 from '../../../../assets/images/landingPage/howitworks-1-1.png';
import howitworks2 from '../../../../assets/images/landingPage/howitworks2.png';
import howitworks3 from '../../../../assets/images/landingPage/howitworks3.png';
import howitworks21 from '../../../../assets/images/landingPage/howitworks-2-1.png';
import howitworks31 from '../../../../assets/images/landingPage/howitworks-3-1.png';
import howitworks4 from '../../../../assets/images/landingPage/howitworks4.png';

const HomePage = () => {
    return (
        <>
            <ThePublicHeader />
            <section className='about bg-white sectionBoxShadow'>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-md-8 pr-0'>
                            <div className='aboutTitle text-left ml-auto'>
                                <h2 className='font40 fw-500 family-medium mb-4'>Never Schedule a Meeting Again</h2>
                                <p className='font18 gray8 mb-5'>
                                    EasyMeet allows busy people to conduct meetings whenever <br /> they have some free
                                    time.
                                </p>
                                <div className='idea'>
                                    <h3 className='font18 fw-600'>The idea is simple:</h3>
                                    <p className='m-0'>
                                        You give people a link to request a meeting. When you're free to take the
                                        meeting, they get notified. If they're also free at that time, you connect.
                                        Otherwise you try again later, simple as that!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='aboutImg text-left'>
                                <img src={smartmockups} alt='smartmockups' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='benefits bg-white sectionBoxShadow'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <h2 className='gray6 font16 mb-4 uppercase'>Benefits</h2>
                            <p className='font24 mb-4'>
                                No-hassle meetings for you, your friends, co-workers, fans and everyone else
                            </p>
                            <img src={benefits} alt='Benefits' className='d-md-block w-100 d-none' />
                        </div>
                        <div className='d-flex justify-content-center w-100 flex-column d-md-none'>
                            <div className='col-sm-12 mb-4'>
                                <img className='mb-3' src={circle1} alt='circle' />
                                <p>100% free</p>
                            </div>
                            <div className='col-sm-12 mb-4'>
                                <img className='mb-3' src={circle2} alt='circle' />
                                <p>Nothing to download or install </p>
                            </div>
                            <div className='col-sm-12 mb-4'>
                                <img className='mb-3' src={circle3} alt='circle' />
                                <p>Easy to use: Just share a link!</p>
                            </div>
                            <div className='col-sm-12'>
                                <img className='mb-3' src={circle4} alt='circle' />
                                <p className='m-0'>One-click to audio/video chat</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='howItWorks mb-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12 howItWorkstitle'>
                            <h2 className='font40 fw-500 family-medium'>How it Works</h2>
                        </div>
                        <div className='d-flex flex-wrap overflow-hidden pb-5'>
                            <div className='col-md-6 order-2 order-md-1 order-lg-1 order-xl-1 pl-0'>
                                <div className='howItWorksImg'>
                                    <img className='w-100' src={howitworks1} alt='howitworks1' />
                                </div>
                            </div>
                            <div className='col-md-6 order-1 order-md-2 order-lg-2 order-xl-2 pr-0'>
                                <div className='howItWorksSteps text-left'>
                                    <h3 className='gray6 medium-size uppercase mb-3'>Step 1</h3>
                                    <p className='font24 mb-5'>
                                        Share your EasyMeet link with whoever wants to have a meeting with you{' '}
                                    </p>
                                    <img src={howitworks111} alt='howitworks' />
                                </div>
                            </div>
                        </div>
                        <div className='d-flex flex-wrap overflow-hidden pb-5'>
                            <div className='col-md-6 pl-0'>
                                <div className='howItWorksSteps text-right'>
                                    <h3 className='gray6 medium-size uppercase mb-3'>Step 2</h3>
                                    <p className='font24 mb-5'>
                                        Mark yourself available whenever you have some free time and notify those
                                        waiting to meet with you.
                                    </p>
                                    <img className='stepImg' src={howitworks11} alt='howitworks' />
                                </div>
                            </div>
                            <div className='col-md-6 pr-0'>
                                <div className='howItWorksImg'>
                                    <img className='w-100' src={howitworks2} alt='howitworks2' />
                                </div>
                            </div>
                        </div>
                        <div className='d-flex flex-wrap overflow-hidden pb-5'>
                            <div className='col-md-6 order-2 order-md-1 order-lg-1 order-xl-1 pl-0'>
                                <div className='howItWorksImg'>
                                    <img className='w-100' src={howitworks3} alt='howitworks3' />
                                </div>
                            </div>
                            <div className='col-md-6 order-1 order-md-2 order-lg-2 order-xl-2 pr-0'>
                                <div className='howItWorksSteps text-left'>
                                    <h3 className='gray6 medium-size uppercase mb-3'>Step 3</h3>
                                    <p className='font24 mb-2'>
                                        Start an audio/video chat with one click when both parties are available at the
                                        same time.
                                    </p>
                                    <img className='stepImg' src={howitworks21} alt='howitworks' />
                                </div>
                            </div>
                        </div>
                        <div className='d-flex flex-wrap overflow-hidden pb-5 step4Container'>
                            <div className='col-md-6 pl-0'>
                                <div className='howItWorksSteps text-right'>
                                    <h3 className='gray6 medium-size uppercase mb-3'>Step 4</h3>
                                    <p className='font24 mb-4'>
                                        Lots of people want to meet with you? Conduct meetings on a first-come,
                                        first-serve basis with the built in waitlist.
                                    </p>
                                    <img className='step4Img' src={howitworks31} alt='howitworks' />
                                </div>
                            </div>
                            <div className='col-md-6 pr-0'>
                                <div className='howItWorksImg'>
                                    <img className='w-100' src={howitworks4} alt='howitworks4' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer>
                <div className='startNow'>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col-sm-12 col-md-6 p-0'>
                                <h2 className='white font40 fw-600 family-medium mb-4'>Start Now - it’s Free</h2>
                                <p className='white9 font18 mb-4' style={{ lineHeight: '32px' }}>
                                    EasyMeet allows busy people to conduct meetings whenever they have some free time.
                                </p>
                                <a className='p-0 m-0 footerSignUp' href='/sign-up'>
                                    <button
                                        type='button'
                                        className='btn btn-primary blue font18 bg-white fw-600 px-4 py-3 mb-2'>
                                        Sign Up
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='terms'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-12 mb-4'>
                                <ul className='list-unstyled d-flex justify-content-center mb-4'>
                                    <li className='px-3'>
                                        <a className='small-size' href='#'>
                                            Contact Us
                                        </a>
                                    </li>
                                    <li className='px-3'>
                                        <a className='small-size' href='#'>
                                            Privacy Policy
                                        </a>
                                    </li>
                                    <li className='px-3'>
                                        <a className='small-size' href='#'>
                                            Terms of Service
                                        </a>
                                    </li>
                                </ul>
                                <p className='small-size gray6'>Copyright EasyMeet 2020</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};
export default HomePage;
