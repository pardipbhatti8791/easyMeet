import React from 'react';
import { notifyAll } from '~/redux/boarding/action';
import { accessFromObject } from '../../../../../../utils/accessFromObject';
import { accessFromArray } from '../../../../../../utils/accessFromArray';
import { useDispatch, useSelector } from 'react-redux';

const MeeterList = (props) => {
  const dispatch = useDispatch();
  const { data } = props;
  const total_req = accessFromObject(data, 'total_pending');
  const meetings = accessFromArray(data, 'mettings');
  const userInfo = useSelector((state) => state.auth.user);
  const onClickNotify = (value) => {
    const data = {
      status_category: 'single',
      status_type: 'accept',
      requester_id: value,
    };
    dispatch(notifyAll(data));
  };
  const onClickReject = (value) => {
    const data = {
      status_category: 'single',
      status_type: 'reject',
      requester_id: value,
    };
    dispatch(notifyAll(data));
  };
  const onClickNotifyAll = () => {
    const data = {
      status_category: 'multiple',
      status_type: 'accept',
    };
    dispatch(notifyAll(data));
  };
  const onClickRejectAll = () => {
    const data = {
      status_category: 'multiple',
      status_type: 'reject',
    };
    dispatch(notifyAll(data));
  };

  return (
    <>
      <section className='search mt-2'>
        <div className='container'>
          <div className='row'>
            <div className='col-6 px-0'>
              <div className='row'>
                <span className='col-3 align-self-center small-size text-left pr-0'>
                  <span>{total_req === 'Invalid key' ? '0' : total_req}</span>{' '}
                  {total_req > 1 ? 'Pending Requests' : 'Pending Request'}
                </span>
                <div className='form-group has-search col-6 mb-0 px-0 py-0'>
                  <span className='fa fa-search form-control-feedback' />
                  <input
                    type='text'
                    className='form-control small-size'
                    placeholder='Search by name or email'
                  />
                </div>
              </div>
            </div>
            <div className='col-6 mr-auto bulk-action text-right pr-0'>
              <span className='col-3 align-self-center small-size text-left pr-0'>
                Bulk Actions:
              </span>
              <div className='notifyBtnContainer d-inline-block'>
                <button
                  id='notifyAll'
                  className='btn default-btn small-size bg-white notify ml-3'
                  onClick={onClickNotifyAll}
                >
                  <i className='fa fa-bell-o mr-1' aria-hidden='true' />
                  Notify All
                </button>
                <span
                  id='notifyPopup'
                  className='popuptext bg-white small-size text-left default-opacity'
                >
                  We just notified all your requestors.
                  <br />
                  Notifications are not available for the next 10 minutes in
                  order to prevent spam
                  <br />
                  <span
                    id='dismiss'
                    className='text-right small-size blue d-inline-block w-100 mt-1'
                  >
                    Dismiss
                  </span>
                </span>
              </div>
              <button
                className='btn default-btn small-size bg-white reject'
                onClick={onClickRejectAll}
              >
                <i className='fa fa-times mr-1' aria-hidden='true' />
                Reject All
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className='meeting-requists'>
        <div className='container'>
          {Array.isArray(meetings) === true ? (
            meetings.map((requester, index) => (
              <div
                key={index}
                className='requster-container bg-white w-100 mt-3'
              >
                <div className='row mx-0'>
                  <div className='media text-left mr-auto'>
                    <div className='align-self-start text-center mr-3 avatar-container bg-white medium-size'>
                      <span>
                        {requester.requester_name.substr(0, 1).toUpperCase()}{' '}
                      </span>
                    </div>
                    <div className='media-body align-self-center'>
                      <h2 className='my-0 requesterName'>
                        {requester.requester_name}
                      </h2>
                      <span className='url-room small-size'>
                        {requester.requester_email}
                      </span>
                    </div>
                  </div>
                  <div className='ml-auto'>
                    <div className='bulk-action text-right pr-0'>
                      <button
                        className='btn default-btn small-size bg-white notify ml-3'
                        value={requester.requester_id}
                        onClick={(e) => onClickNotify(e.target.value)}
                      >
                        <i className='fa fa-bell-o mr-1' aria-hidden='true' />
                        Notify All
                      </button>
                      <button
                        className='btn default-btn small-size bg-white reject'
                        value={requester.requester_id}
                        onClick={(e) => onClickReject(e.target.value)}
                      >
                        <i className='fa fa-times mr-1' aria-hidden='true' />
                        Reject All
                      </button>
                    </div>
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
          ) : (
            <div className='row justify-content-center'>
              <div className='col-lg-6 col-sm-12 px-2'>
                <div className='createURL mb-3'>
                  <div className='empty-icon m-auto text-center'>
                    Empty Icon
                  </div>
                  <h3 className='my-3 medium-size'>
                    You have no meeting requests yet.
                  </h3>
                  <p className='mb-4'>
                    Make sure to share your link with the people you want to
                    meet online.
                  </p>
                </div>
                <div className='createdURL text-center mb-2'>
                  easymeet.io/{userInfo.meeter_meet_slug}
                </div>
                <div className='row icons mb-4'>
                  <div className='col mx-2 px-0'>
                    <a className='px-1 py-2' href='#'>
                      <img
                        className='pr-1'
                        src='/assets/images/Copy.png'
                        alt='Copy'
                      />{' '}
                      <span>Copy</span>{' '}
                    </a>
                  </div>
                  <div className='col mx-2 px-0'>
                    <a className='px-1 py-2' href='#'>
                      <img
                        className='pr-1'
                        src='/assets/images/facebook.png'
                        alt='Facebook'
                      />
                      <span>Facebook</span>{' '}
                    </a>
                  </div>
                  <div className='col mx-2 px-0'>
                    <a className='px-1 py-2' href='#'>
                      <img
                        className='pr-1'
                        src='/assets/images/twitter.png'
                        alt='Twitter'
                      />{' '}
                      <span>Twitter</span>{' '}
                    </a>
                  </div>
                  <div className='col mx-2 px-0'>
                    <a className='px-1 py-2' href='#'>
                      <img
                        className='pr-1'
                        src='/assets/images/linkedin.png'
                        alt='LinkedIn'
                      />{' '}
                      <span>LinkedIn</span>{' '}
                    </a>
                  </div>
                  <div className='col mx-2 px-0'>
                    <a className='px-1 py-2' href='#'>
                      <img
                        className='pr-1'
                        src='/assets/images/Envelope.png'
                        alt='Email'
                      />{' '}
                      <span>Email</span>{' '}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MeeterList;
