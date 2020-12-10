import React, { useState } from 'react';
import { notifyAll } from '~/redux/boarding/action';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getAccessToken, createRoom } from '../../../../../../redux/rooms/action';
import { getMeetingList, setMeetingListPage } from '../../../../../../redux/meetings/action';

import { useDispatch, useSelector } from 'react-redux';
import { accessFromObject } from '../../../../../../utils/accessFromObject';
import { accessFromArray } from '../../../../../../utils/accessFromArray';

import copyImage from '~/assets/images/copyicon.png';
import facebook from '~/assets/images/facebook.png';
import twitter from '~/assets/images/twitter.png';
import linkedin from '~/assets/images/linkedin.png';
import envelop from '~/assets/images/Envelope.png';
import { copyToClipBoard } from '../../../../../../utils/copyToCilpBoard';
import { gpAxios } from '../../../../../../utils/gpAxios';

const MeeterList = props => {
    const dispatch = useDispatch();
    const { data } = props;
    const [keyword, setKeyword] = useState('');
    const [request_sent_id, set_request_sent_id] = useState(null);
    const total_req = accessFromObject(data, 'total_pending');
    const next_page = accessFromObject(data, 'next_page');
    const meetings = accessFromArray(data, 'mettings');
    const userInfo = useSelector(state => state.auth.user);
    const roomInfo = useSelector(state => state.rooms);
    const [filtered, setFiltered] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const roomName = Math.floor(Math.random() * 1000000 + 1);
    const userEmail = userInfo.meeter_email;

    let requester_id_list = [];

    const onClickNotify = (requester_id, requester_email) => {
        requester_id_list = [];
        requester_id_list.push(requester_id);
        const data = {
            requester_id: requester_id_list,
            meeter_id: userInfo.id,
            video_meeting_url: 'https://easymeet.io/video-chat/'
        };
        dispatch(createRoom(data)).then(res => {
            console.log('ress', res);
            //console.log('res from create room is', res.data.data.result.room_link);
            //window.location.href = res.data.data.result.room_link;
            set_request_sent_id(requester_id);
        });
    };
    const onClickReject = value => {
        const data = {
            status_category: 'single',
            status_type: 'reject',
            requester_id: value
        };
        dispatch(notifyAll(data)).then(res => {
            dispatch(getMeetingList());
        });
    };
    const onKeywordChange = e => {
        setKeyword(e.target.value);
        let filteredValue = meetings.filter(requester => {
            return (
                requester.requester_email.indexOf(e.target.value) > -1 ||
                requester.requester_name.indexOf(e.target.value) > -1
            );
        });
        setFiltered(filteredValue);
    };
    const onClickNotifyAll = () => {
        // const data = {
        //     status_category: 'multiple',
        //     status_type: 'accept'
        // };
        //dispatch(notifyAll(data));
        requester_id_list = [];
        if (Array.isArray(meetings) === true) {
            meetings.map(requester => {
                requester_id_list.push(requester.requester_id);
            });
        }
        const data = {
            requester_id: requester_id_list,
            meeter_id: userInfo.id,
            video_meeting_url: 'https://easymeet.io/video-chat/'
        };

        dispatch(createRoom(data)).then(res => {
            console.log('response on notifyall', res);
        });
    };

    // const onClickRejectAll = () => {
    //     const data = {
    //         status_category: 'multiple',
    //         status_type: 'reject'
    //     };
    //     dispatch(notifyAll(data));
    // };

    const getMoreData = () => {
        console.log('hited');
        if (next_page == 0) {
            setHasMore(false);
        }
        if (next_page != undefined && next_page != 0) {
            dispatch(getMeetingList(next_page));
        }
    };
    return (
        <>
            <section className='search mt-2'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='d-md-flex align-items-center custom-search-request'>
                                <div className='small-size  mr-2 text-left'>
                                    <span>{total_req === 'Invalid key' ? '0' : total_req}</span>{' '}
                                    {total_req > 1 ? 'Pending Requests' : 'Pending Request'}
                                </div>
                                <div className='form-group has-search mb-0'>
                                    <span className='fa fa-search form-control-feedback' />
                                    <input
                                        type='text'
                                        className='form-control small-size'
                                        placeholder='Search by name or email'
                                        onChange={e => onKeywordChange(e)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 mr-auto bulk-action text-right pr-0'>
                            <span className='col-3 align-self-center small-size text-left pr-0'>Bulk Actions:</span>
                            <div className='notifyBtnContainer d-inline-block'>
                                <button
                                    id='notifyAll'
                                    className='btn default-btn small-size bg-white notify ml-3'
                                    onClick={onClickNotifyAll}>
                                    <i className='fa fa-bell-o mr-1' aria-hidden='true' />
                                    Notify All
                                </button>
                                {/* <span
                                    id='notifyPopup'
                                    className='popuptext bg-white small-size text-left default-opacity'>
                                    We just notified all your requestors.
                                    <br />
                                    Notifications are not available for the next 10 minutes in order to prevent spam
                                    <br />
                                    <span id='dismiss' className='text-right small-size blue d-inline-block w-100 mt-1'>
                                        Dismiss
                                    </span>
                                </span> */}
                            </div>
                            {/* <button className='btn default-btn small-size bg-white reject' onClick={onClickRejectAll}>
                                <i className='fa fa-times mr-1' aria-hidden='true' />
                                Reject All
                            </button> */}
                        </div>
                    </div>
                </div>
            </section>
            <InfiniteScroll
                dataLength={10} //This is important field to render the next data
                next={getMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }>
                <section>
                    <div className='container'>
                        {Array.isArray(meetings) === true ? (
                            keyword === '' ? (
                                meetings.map((requester, index) => (
                                    <div
                                        key={index}
                                        className='requster-container requster-category bg-white w-100 mt-3'>
                                        <div className='row'>
                                            <div className='col-md-8'>
                                                <div className='request-category-inner'>
                                                    <div className='request-category-img d-flex'>
                                                        <figure className='mb-0'>
                                                            <span>
                                                                {requester.requester_name.substr(0, 1).toUpperCase()}{' '}
                                                            </span>
                                                        </figure>
                                                        <div className='request-category-inner-text text-left'>
                                                            <h2 className='my-0 requesterName'>
                                                                {requester.requester_name}
                                                            </h2>
                                                            <span className='url-room small-size'>
                                                                {requester.requester_email}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className='request-summary text-left mt-3'>
                                                        <h3 className='small-size mb-0'>Request Summary:</h3>
                                                        <p className='small-size' style={{ opacity: '0.6' }}>
                                                            {requester.summary}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-4'>
                                                <div className='bulk-action text-right pr-0'>
                                                    {/* <button
                                                className='btn default-btn small-size bg-white  ml-3'
                                                onClick={onJoinRoomClick}>
                                                Join Room
                                            </button> */}
                                                    {request_sent_id == requester.requester_id ? (
                                                        <button
                                                            className='btn default-btn small-size bg-white notify mr-2'
                                                            value={requester.requester_id}>
                                                            <i className='fa fa-check mr-1' aria-hidden='true' />
                                                            Sent
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className='btn default-btn small-size bg-white notify mr-2'
                                                            value={requester.requester_id}
                                                            onClick={e => {
                                                                onClickNotify(
                                                                    requester.requester_id,
                                                                    requester.requester_email
                                                                );
                                                            }}>
                                                            <i className='fa fa-bell-o mr-1' aria-hidden='true' />
                                                            Notify
                                                        </button>
                                                    )}

                                                    <button
                                                        className='btn default-btn small-size bg-white reject'
                                                        value={requester.requester_id}
                                                        onClick={e => onClickReject(e.target.value)}>
                                                        <i className='fa fa-times mr-1' aria-hidden='true' />
                                                        Reject
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                filtered.map((requester, index) => (
                                    <div key={index} className='requster-container bg-white w-100 mt-3'>
                                        <div className='row mx-0'>
                                            <div className='media text-left mr-auto'>
                                                <div
                                                    className='align-self-start text-center mr-3 avatar-container bg-white medium-size'
                                                    style={{ paddingTop: '30px' }}>
                                                    <span>{requester.requester_name.substr(0, 1).toUpperCase()} </span>
                                                </div>
                                                <div className='media-body align-self-center'>
                                                    <h2 className='my-0 requesterName'>{requester.requester_name}</h2>
                                                    <span className='url-room small-size'>
                                                        {requester.requester_email}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className='bulk-action text-right pr-0'>
                                                {/* <button
                                                    className='btn default-btn small-size bg-white  ml-3'
                                                    onClick={onJoinRoomClick}>
                                                    Join Room
                                                </button> */}

                                                <button
                                                    className='btn default-btn small-size bg-white notify ml-3'
                                                    value={requester.requester_id}
                                                    onClick={e => {
                                                        onClickNotify(
                                                            requester.requester_id,
                                                            requester.requester_email
                                                        );
                                                    }}>
                                                    <i className='fa fa-bell-o mr-1' aria-hidden='true' />
                                                    Notify
                                                </button>

                                                <button
                                                    className='btn default-btn small-size bg-white reject'
                                                    value={requester.requester_id}
                                                    onClick={e => onClickReject(e.target.value)}>
                                                    <i className='fa fa-times mr-1' aria-hidden='true' />
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                        <div className='request-summary text-left col-9 pr-0 mt-3'>
                                            <h3 className='small-size mb-0'>Request Summary:</h3>
                                            <span className='small-size' style={{ opacity: '0.6' }}>
                                                {requester.summary}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )
                        ) : (
                            <div className='row justify-content-center'>
                                <div className='col-lg-6 col-sm-12 px-2'>
                                    <div className='createURL mb-3'>
                                        <div className='empty-icon m-auto text-center'>Empty Icon</div>
                                        <h3 className='my-3 medium-size'>You have no meeting requests yet.</h3>
                                        <p className='mb-4'>
                                            Make sure to share your link with the people you want to meet online.
                                        </p>
                                    </div>
                                    <div
                                        style={{ cursor: 'pointer' }}
                                        className='createdURL text-center mb-2'
                                        onClick={() =>
                                            copyToClipBoard(`easymeet.io/meet/${userInfo.meeter_meet_slug}`)
                                        }>
                                        easymeet.io/meet/{userInfo.meeter_meet_slug}{' '}
                                        <img className='pr-1' src={copyImage} alt='Copy' />{' '}
                                    </div>
                                    {/* <div className='row icons mb-4'>
                                    <div className='col mx-2 px-0'>
                                        <a className='px-1 py-2' href='#'>
                                            <img className='pr-1' src={copyImage} alt='Copy' /> <span>Copy</span>{' '}
                                        </a>
                                    </div>
                                    <div className='col mx-2 px-0'>
                                        <a className='px-1 py-2' href='#'>
                                            <img className='pr-1' src={facebook} alt='Facebook' />
                                            <span>Facebook</span>{' '}
                                        </a>
                                    </div>
                                    <div className='col mx-2 px-0'>
                                        <a className='px-1 py-2' href='#'>
                                            <img className='pr-1' src={twitter} alt='Twitter' />
                                            <span>Twitter</span>{' '}
                                        </a>
                                    </div>
                                    <div className='col mx-2 px-0'>
                                        <a className='px-1 py-2' href='#'>
                                            <img className='pr-1' src={linkedin} alt='LinkedIn' />
                                            <span>LinkedIn</span>{' '}
                                        </a>
                                    </div>
                                    <div className='col mx-2 px-0'>
                                        <a className='px-1 py-2' href='#'>
                                            <img className='pr-1' src={envelop} alt='Email' /> <span>Email</span>{' '}
                                        </a>
                                    </div>
                                </div> */}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </InfiniteScroll>
        </>
    );
};

export default MeeterList;
