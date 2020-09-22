import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ThePublicHeader = (props) => {
    const { history } = props
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-white pt-4 pb-4">
                <div className="container">
                    <a className="navbar-brand" href="index.html">
                        <img src="../../assets/images/EasyMeet.svg" alt="logo"/>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link to={'/login'}>Login</Link>
                            </li>
                            <li className="nav-item">
                                <button type="button" onClick={() => history.push('/sign-up')} className="btn btn-primary">Sign Up</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default withRouter(ThePublicHeader);