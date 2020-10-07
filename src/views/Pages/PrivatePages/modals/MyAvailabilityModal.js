import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { updateAvailability } from '../../../../redux/boarding/action';
import { closeModal } from '../../../../redux/global_modal/actions';
import { RadioButton, RadioGroup } from 'react-radio-buttons';
import { accessFromObject } from '../../../../utils/accessFromObject';

const MyAvailabilityModal = (props) => {
  /**
   * @ { React hooks }
   */
  const [switchAvailability, setSwitchAvailability] = useState(true);
  const [availabilityDuration, setAvailabilityDuration] = useState({
    value: '30 minutes',
  });
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  /**
   *
   */
  const changeAvailability = () => {
    setLoader(true);
    const data = {
      meeter_availibility: 'yes',
      time_duration: availabilityDuration.value,
    };

    if (!switchAvailability) {
      delete data.time_duration;
      data.meeter_availibility = 'no';
    }

    dispatch(updateAvailability(data)).then((resp) => {
      setLoader(false);
      dispatch(closeModal());
    });
  };

  /**
   *
   * @param value
   */
  const changeAvailabilityDuration = (value) => {
    setAvailabilityDuration({ value: value });
  };

  /**
   *
   * @param value
   */
  const onChange = (value) => {
    if (value === 'yes') {
      setSwitchAvailability(true);
    } else {
      setSwitchAvailability(false);
    }
  };

  return (
    <div>
      <div className='modal-header'>
        <h5 className='modal-title small-size align-self-center'>
          Changing your Availability
        </h5>
        <button
          type='button'
          className='close'
          onClick={() => dispatch(closeModal())}
        >
          <span aria-hidden='true'>×</span>
        </button>
      </div>
      <div className='MeeterLine mx-0'></div>
      <div className='modal-body pb-0'>
        <div className='avilability ml-auto text-left'>
          <span className='small-size'>Your Availability Status</span>
          <div className='align-self-center row d-flex mx-0 my-2'>
            <div
              className='button b2 modal-available-btnwrapper'
              id='button-10'
            >
              <RadioGroup value={'yes'} onChange={onChange} horizontal>
                <RadioButton value='yes'>Available</RadioButton>
                <RadioButton value='no'>Not Available</RadioButton>
              </RadioGroup>
            </div>
          </div>
        </div>
        {switchAvailability == true && (
          <div>
            <div className='small-size text-left opacity-8 py-2'>
              When your status is set to ‘Available’, your Requestors and You
              will receive browser and email notifications in order to start
              your meetings.
            </div>
            <div className='form-group mb-0 px-0 py-3'>
              <h5 className='small-size align-self-center text-left mb-2 pb-1'>
                I am Available for the next:
              </h5>
              <div className='radio'>
                <input
                  id='radio-1'
                  name='radio'
                  type='radio'
                  value='10 minutes'
                  onChange={(e) => changeAvailabilityDuration(e.target.value)}
                />
                <label
                  for='radio-1'
                  className='radio-label small-size opacity-8'
                >
                  10 minutes
                </label>
              </div>
              <div className='radio'>
                <input
                  id='radio-2'
                  name='radio'
                  type='radio'
                  value='30 minutes'
                  onChange={(e) => changeAvailabilityDuration(e.target.value)}
                />
                <label
                  for='radio-2'
                  className='radio-label small-size opacity-8'
                >
                  30 minutes
                </label>
              </div>
              <div className='radio'>
                <input
                  id='radio-3'
                  name='radio'
                  type='radio'
                  value='1 hour'
                  onChange={(e) => changeAvailabilityDuration(e.target.value)}
                />
                <label
                  for='radio-3'
                  className='radio-label small-size opacity-8'
                >
                  1 hour
                </label>
              </div>
              <div className='radio'>
                <input
                  id='radio-4'
                  name='radio'
                  type='radio'
                  value='2 hours'
                  onChange={(e) => changeAvailabilityDuration(e.target.value)}
                />
                <label
                  for='radio-4'
                  className='radio-label small-size opacity-8'
                >
                  2 hours
                </label>
              </div>
              <div className='radio'>
                <input
                  id='radio-5'
                  name='radio'
                  type='radio'
                  value='4 hours'
                  onChange={(e) => changeAvailabilityDuration(e.target.value)}
                />
                <label
                  for='radio-5'
                  className='radio-label small-size opacity-8'
                >
                  4 hours
                </label>
              </div>
              <div className='radio'>
                <input
                  id='radio-6'
                  name='radio'
                  type='radio'
                  value='8 hours'
                  onChange={(e) => changeAvailabilityDuration(e.target.value)}
                />
                <label
                  for='radio-6'
                  className='radio-label small-size opacity-8'
                >
                  8 hours
                </label>
              </div>
            </div>
            <div className='MeeterLine'></div>
            <div className='form-group px-0 py-3 mb-0'>
              <div className='chkbox'>
                <label>
                  <input type='checkbox' name='checkbox' value='css' />
                  <span className='small-size opacity-8'>
                    Open Meeting Room Window
                  </span>
                </label>
              </div>
              <div className='chkbox'>
                <label>
                  <input type='checkbox' name='checkbox' value='css' checked />
                  <span className='small-size opacity-8'>
                    Send Notifications to all Requestors
                  </span>
                </label>
              </div>
            </div>
            <div className='MeeterLine'></div>
          </div>
        )}
      </div>

      <div className='modal-footer'>
        <button
          className='btn discard p-0 m-0 mr-auto medium-size opacity-6'
          onClick={() => dispatch(closeModal())}
        >
          Discard changes
        </button>
        <button
          content='Update'
          className='btn btn-primary small-size m-0 update'
          onClick={changeAvailability}
          positive
        >
          {loader ? 'Updating...' : 'Update'}
        </button>
      </div>
    </div>
  );
};

export default MyAvailabilityModal;
