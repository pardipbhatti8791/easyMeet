import React, { Fragment, useState } from 'react';
import { accessFromObject } from '../../../../../utils/accessFromObject';
import defaultImg from '../../.././../../assets/images/photo.png';
const MeeterDetails = props => {
    const { data } = props;
    const [showMore, setShowMore] = useState(true);
    const availabilty = accessFromObject(data, 'availibility');
    const addDefaultSrc = e => {
        e.target.src = defaultImg;
    };
    let minorString;
    let majorString = accessFromObject(data, 'meeter_bio');
    if (majorString != undefined) {
        if (majorString.length > 250) {
            minorString = majorString.substring(0, 250);
        }
    }

    return (
        <Fragment>
            <div className='media personal-details custom-personal-details media-body text-center d-block mb-4'>
                <div>
                    <img
                        className='text-center default-opacity m-auto avatar-container'
                        src={
                            accessFromObject(data, 'meeter_image_slug') === ''
                                ? '../../../../assets/images/photo.png'
                                : accessFromObject(data, 'meeter_image_slug')
                        }
                        alt='photo'
                        onError={addDefaultSrc}
                    />
                </div>
                <h2 className='requesterName mt-3 mb-1 mb-0'>{accessFromObject(data, 'meeter_fullname')}</h2>
                {/* <a className='edit-bio small-size' href='#'>
                    {accessFromObject(data, 'meeter_bio')}
                </a> */}
                <p className='edit-bio small-size' href='#'>
                    {majorString != undefined ? (showMore && majorString.length > 250 ? minorString : majorString) : ''}{' '}
                    {majorString != undefined ? (
                        majorString.length > 250 ? (
                            showMore ? (
                                <a
                                    style={{ cursor: 'pointer' }}
                                    className='url-room small-size'
                                    onClick={() => setShowMore(!showMore)}>
                                    Show more..
                                </a>
                            ) : (
                                <a
                                    style={{ cursor: 'pointer' }}
                                    className='url-room small-size'
                                    onClick={() => setShowMore(!showMore)}>
                                    Show less..
                                </a>
                            )
                        ) : (
                            ''
                        )
                    ) : (
                        ''
                    )}
                </p>
                <span className='small-size d-block opacity-6 mt-1'>
                    {accessFromObject(availabilty, 'meeter_availibility') === 'yes'
                        ? `Available for ${accessFromObject(availabilty, 'available_for').hours} hours and ${
                              accessFromObject(availabilty, 'available_for').minutes
                          } minutes`
                        : accessFromObject(availabilty, 'meeter_availibility') === 'no' &&
                          !Array.isArray(accessFromObject(availabilty, 'available_ago'))
                        ? `Available ${accessFromObject(availabilty, 'available_ago').hours} hours and ${
                              accessFromObject(availabilty, 'available_ago').minutes
                          } minutes ago`
                        : ''}
                </span>
            </div>
            <div className='mb-4 custom-content'>
                <span className='requesterMsg'>{accessFromObject(data, 'meeter_fullname')}</span>{' '}
                <span className='requesterMsg opacity-8'>wants to meet with you when you're both free.</span>
            </div>
            <div className='custom-content'>
                <p className='small-size opacity-6 mb-0'>
                    Simply fill the information required and you'll get notified whenever{' '}
                    {accessFromObject(data, 'meeter_fullname')} is free to <br />
                    take a meeting.
                </p>
                <br />
                <p className='small-size opacity-6'>
                    If you're also free at that time, you can connect with 1-click, otherwise you just try again <br />
                    later. It's that simple.
                </p>
                <div className='MeeterProfileArrow'>&#187;</div>
            </div>
            <div className='meeterProfileMsg px-2 py-3 personal-meeting-profile'>
                <h2 className='opacity-8'>Use EasyMeet to host meetings yourself!</h2>
                <p className='opacity-6 mb-0'>dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>

                <button
                    type='button'
                    className='btn btn-primary medium-size'
                    onClick={() => (window.location.href = '/sign-up')}>
                    Sign up as a host
                </button>
            </div>
        </Fragment>
    );
};

export default MeeterDetails;
