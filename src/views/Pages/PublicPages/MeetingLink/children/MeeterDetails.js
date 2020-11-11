import React, { Fragment } from 'react';
import { accessFromObject } from '../../../../../utils/accessFromObject';

const MeeterDetails = props => {
    const { data } = props;

    const availabilty = accessFromObject(data, 'availibility');
    return (
        <Fragment>
            <div className='media personal-details media-body text-center d-block mb-4'>
                <div>
                    <img
                        className='text-center default-opacity m-auto avatar-container'
                        src={
                            accessFromObject(data, 'meeter_image_slug') === ''
                                ? '../../../../assets/images/photo.png'
                                : accessFromObject(data, 'meeter_image_slug')
                        }
                        alt='photo'
                    />
                </div>
                <h2 className='requesterName mt-3 mb-1 mb-0'>{accessFromObject(data, 'meeter_fullname')}</h2>
                <a className='edit-bio small-size' href='#'>
                    {accessFromObject(data, 'meeter_bio')}
                </a>
                <span className='small-size d-block opacity-6 mt-1'>
                    {accessFromObject(availabilty, 'meeter_availibility') === 'yes' &&
                    accessFromObject(availabilty, 'available_for').hours <= 72
                        ? `Available for ${accessFromObject(availabilty, 'available_for').hours} hours and ${
                              accessFromObject(availabilty, 'available_for').minutes
                          }`
                        : 'Not Available'}
                </span>
            </div>
            <div className='mb-4'>
                <span className='requesterMsg'>{accessFromObject(data, 'meeter_fullname')}</span>{' '}
                <span className='requesterMsg opacity-8'>wants to meet with you when you're both free.</span>
            </div>
            <div>
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
            <div className='meeterProfileMsg px-2 py-3'>
                <h2 className='opacity-8'>Use EasyMeet to host meetings yourself!</h2>
                <span className='opacity-6'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                </span>

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
