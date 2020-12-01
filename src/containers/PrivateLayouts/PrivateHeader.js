import { Link } from 'react-router-dom';
import React, { useState } from 'react';

import { logout } from '../../redux/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { updateAvailability } from '../../redux/boarding/action';
import img from '../../assets/images/EasyMeet.svg';
import { closeModal, openModal } from '../../redux/global_modal/actions';
//import mobimg from '../../assets/images/mob-logo.svg';

function ThePrivateHeader() {
    const [menuActive, setMenuActive] = useState(false);
    const userInfo = useSelector(state => state.auth.user);
    const {
        availibility: { meeter_availibility, available_for }
    } = userInfo;

    const addDefaultSrc = e => {
        e.target.source = img;
    };
    const becomeAvailable = () => {
        dispatch(openModal('MyAvailabilityModal', { open: true }));
    };

    const dispatch = useDispatch();
    return (
        <header className='pb-3 bg-white'>
            <nav className='navbar navbar-expand-lg pt-4 pb-4 custom-mob-nav'>
                <div className='container'>
                    <Link className='navbar-brand mob-hide' href='index.html' to={`/`}>
                        <img src={img} onError={addDefaultSrc} alt='EasyMeet' />
                    </Link>
                    <Link className='navbar-brand desktop-hide' href='index.html' to={`/`}>
                        {/* <img src={mobimg} onError={addDefaultSrc} alt='EasyMeet' /> */}
                    </Link>
                    {meeter_availibility === 'yes' ? (
                        <div className='mob-availbtn-wrapper' style={{ fontSize: '12px' }}>
                            Available for: {available_for && available_for.hours} hours{' '}
                            {available_for && available_for.minutes}minutes
                            <div
                                onClick={becomeAvailable}
                                className='available-sucess-btn'
                                style={{ color: '#017aff', cursor: 'pointer' }}>
                                Change
                            </div>
                        </div>
                    ) : (
                        <div className='mob-availbtn-wrapper' style={{ fontSize: '12px' }}>
                            Not available
                            <div
                                onClick={becomeAvailable}
                                className='available-sucess-btn'
                                style={{ color: '#017aff', cursor: 'pointer' }}>
                                Become available
                            </div>
                        </div>
                    )}

                    {/* <div className='navbar-toggler'>
                        {meeter_availibility === 'yes' ? (
                            <>
                                Available for: <span>{available_for && available_for.hours}</span> hours{' '}
                                {available_for && available_for.minutes} minutes.
                                
                            </>
                        ) : (
                            'Unavailable'
                        )}
                    </div> */}
                    <button
                        className='navbar-toggler custom-toggle'
                        type='button'
                        data-toggle='collapse'
                        data-target='#navbarNav'
                        aria-controls='navbarNav'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setMenuActive(!menuActive)}>
                        <span className='icon-bar top-bar'></span>
                        <span className='icon-bar top-bar'></span>
                        <span className='icon-bar top-bar'></span>
                    </button>
                    <div className={`collapse navbar-collapse ${menuActive ? 'show' : ''}`} id='navbarNav'>
                        <ul className='navbar-nav ml-auto'>
                            <li className='nav-item active'>
                                <Link to={`/dashboard`}>Dashboard</Link>
                            </li>
                            {/*<li className='nav-item'>*/}
                            {/*  <Link to={`/settings`}>Settings</Link>*/}
                            {/*</li>*/}
                            <li className='nav-item'>
                                <a href='#' onClick={() => dispatch(logout())}>
                                    Log Out
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default ThePrivateHeader;
