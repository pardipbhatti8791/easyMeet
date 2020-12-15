import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../../assets/images/EasyMeet.svg';
import { useSelector } from 'react-redux';

const ThePublicHeader = props => {
    const { history } = props;
    const [menuActive, setMenuActive] = useState(false);
    return (
        <header>
            <nav className='navbar navbar-expand-lg bg-white pt-4 pb-4'>
                <div className='container'>
                    <a className='navbar-brand' href='index.html'>
                        <img src={logo} alt='logo' />
                    </a>
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
                                <a href={'/login'}>Login</a>
                            </li>
                            <li className='nav-item'>
                                <button
                                    type='button'
                                    onClick={() => (window.location.href = '/sign-up')}
                                    className='btn btn-primary'>
                                    Sign Up
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default withRouter(ThePublicHeader);
